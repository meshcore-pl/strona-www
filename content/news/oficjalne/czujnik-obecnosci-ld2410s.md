---
title: Czujnik obecności LD2410S w MeshCore
description: Jak zbudować węzeł MeshCore z czujnikiem LD2410S: podłączenie do Heltec StickLite, kompilacja firmware w PlatformIO, telemetria i alarmy po wykryciu ruchu.
createdAt: 26.11.2026
sourceUrl: https://blog.meshcore.io/2026/11/26/motions-sensors
sourceAuthor: scott-powell
tags: [Poradnik, Sprzęt, Oprogramowanie]
---

# Węzeł MeshCore z czujnikiem obecności LD2410S
![Projekt węzła czujnikowego MeshCore z LD2410S](https://blog.meshcore.io/assets/images/2026/11/26/hero.jpg)

_Scott Powell, główny programista firmware MeshCore_

Z radarowego czujnika obecności LD2410S (24 GHz) i płytki LoRa możesz zbudować węzeł MeshCore, który udostępnia telemetrię i wysyła wiadomości prywatne po wykryciu ruchu. Moduł jest niedrogi i znajdziesz go np. na AliExpress pod nazwą `LD2410S`.

W przykładzie używamy Heltec StickLite. Kod możesz dostosować do innej płytki obsługiwanej przez MeshCore, zmieniając konfigurację sprzętową i wybierając odpowiednie środowisko w PlatformIO.

## Podłączenie czujnika

![LD2410S podłączony do Heltec StickLite](https://blog.meshcore.io/assets/images/2026/11/26/sensor-wiring.jpg)

Zdjęcie pochodzi ze starszego projektu pagera Ripple. Na potrzeby tego węzła wystarczą cztery przewody. Brzęczyk i przycisk ze zdjęcia możesz pominąć.

| Pin LD2410S | Pin na płytce        | Przewód na zdjęciu |
|-------------|----------------------|--------------------|
| `3V3`       | Zasilanie 3,3 V      | Czerwony           |
| `GND`       | Masa (`GND`)         | Czarny             |
| `OT1`       | `RX` interfejsu UART | Żółty              |
| `RX`        | `TX` interfejsu UART | Zielony            |

Opcjonalnie podłącz `OT2` do wejścia cyfrowego płytki. Pin sygnalizuje stan wykrycia obecności i może posłużyć jako źródło przerwania wybudzającego płytkę, jeśli dodasz tryb uśpienia do firmware.

## Firmware i kompilacja

Kod węzła czujnikowego zależy od podłączonego modułu i tego, jak węzeł ma reagować na odczyty. Punktem wyjścia jest przykład `simple_sensor` z repozytorium MeshCore. Na jego podstawie powstał gotowy wariant dla LD2410S. Więcej o szablonie przeczytasz we [wprowadzeniu do węzłów czujnikowych](/aktualnosci/poradnik/wprowadzenie-do-wezlow-czujnikowych).

1. Sklonuj [repozytorium MeshCore Sensor Playground](https://github.com/ripplebiz/MeshCore-sensor-playground) i przełącz się na gałąź `dev`.
2. Otwórz projekt w Visual Studio Code z rozszerzeniem PlatformIO.
3. Wybierz środowisko `Heltec_StickLite_Sensor` i skompiluj firmware.

Zmiany względem głównego repozytorium zobaczysz w [porównaniu gałęzi `dev`](https://github.com/meshcore-dev/MeshCore/compare/dev...ripplebiz:MeshCore-sensor-playground:dev).

## Telemetria

Za obsługę LD2410S odpowiada klasa `MotionSensorManager`. Metoda `querySensors()` zwraca stan uzbrojenia, informację o wykryciu ruchu i odległość przeliczoną z centymetrów na metry. W odpowiedzi na zapytanie o telemetrię węzeł podaje też napięcie akumulatora.

```cpp
bool MotionSensorManager::querySensors(uint8_t requester_permissions, CayenneLPP& telemetry) {
  telemetry.addSwitch(TELEM_CHANNEL_SELF, _armed ? 1 : 0);
  telemetry.addPresence(TELEM_CHANNEL_SELF, ld2410s.isMotionDetected() ? 1 : 0);
  telemetry.addDistance(TELEM_CHANNEL_SELF, ((float)ld2410s.getDistance()) / 100.0f);
  return true;
}
```

![Odczyt telemetrii węzła z czujnikiem LD2410S](https://blog.meshcore.io/assets/images/2026/11/26/sensor-telemetry.png)

## Alarmy po wykryciu ruchu i przy niskim napięciu akumulatora

Przy każdym odczycie `onSensorDataRead()` zapisuje napięcie akumulatora w szeregu czasowym. Spadek poniżej 3,4 V wyzwala alarm o wysokim priorytecie. Wykrycie ruchu przy uzbrojonym czujniku wyzwala alarm o niskim priorytecie. Reguły znajdziesz w `examples/simple_sensor/main.cpp`.

```cpp
Trigger presence_alert, critical_batt;
TimeSeriesData battery_data;

void onSensorDataRead() override {
  float batt_voltage = getVoltage(TELEM_CHANNEL_SELF);
  battery_data.recordData(getRTCClock(), batt_voltage);
  alertIf(batt_voltage < 3.4f, critical_batt, HIGH_PRI_ALERT, "Battery is critical!");
  alertIf(sensors.isArmed() && sensors.isMotionDetected(), presence_alert, LOW_PRI_ALERT, "Motion detected!");
}
```

Klasa `SensorMesh` wysyła alarm jako wiadomość prywatną (DM) do użytkowników zapisanych na liście kontroli dostępu (ACL), którzy mają uprawnienie do odbioru alarmu o danym priorytecie. Zalogowanie się hasłem administratora nadaje te uprawnienia automatycznie.

Po odebraniu alarmu wzrośnie licznik nieprzeczytanych wiadomości. Jeśli masz włączony dźwięk powiadomień, usłyszysz go przy odbiorze. W interfejsie Ripple uzbrojony czujnik ma pomarańczową obwódkę kafelka na ekranie głównym. Kafelek pokazuje też ostatnią wartość telemetrii, w tym przykładzie odległość.

![Czujniki na ekranie głównym Ripple z licznikiem nieprzeczytanych wiadomości](https://blog.meshcore.io/assets/images/2026/11/26/app-sensors.png)

## Uzbrajanie i rozbrajanie czujnika

W wierszu poleceń (CLI) węzła wpisz `arm`, żeby uzbroić czujnik, lub `disarm`, żeby go rozbroić. Przełączenie stanu dotyczy alarmów po wykryciu ruchu. Węzeł nadal udostępnia telemetrię i może wysłać alarm o krytycznym napięciu akumulatora.

Komendy obsługuje metoda `handleCustomCommand()` w `examples/simple_sensor/main.cpp`.

```cpp
bool handleCustomCommand(uint32_t sender_timestamp, char* command, char* reply) override {
  if (strcmp(command, "disarm") == 0) {
    sensors.setArmed(false);
    strcpy(reply, "OK - now disarmed");
    return true;
  }
  if (strcmp(command, "arm") == 0) {
    sensors.setArmed(true);
    strcpy(reply, "OK - now armed");
    return true;
  }
  return false;
}
```

## Montaż na zewnątrz

Scott Powell planuje rozmieścić wokół domu kilka takich węzłów w obudowach odpornych na warunki atmosferyczne i zasilać je panelami słonecznymi. Mając kod źródłowy, możesz dopasować zbierane odczyty, progi i treść alarmów do własnego zastosowania.
