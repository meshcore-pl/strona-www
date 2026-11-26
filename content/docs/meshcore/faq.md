---
title: Najczęściej zadawane pytania
description: Odpowiedzi na najczęstsze pytania o MeshCore, urządzenia, konfigurację i korzystanie z sieci.
canonical: /dokumentacja/meshcore/faq
createdAt: 27.11.2026
---

# Najczęściej zadawane pytania

## Czy MeshCore jest tym samym co Meshtastic?

Nie. MeshCore i Meshtastic to dwa osobne projekty, które wykorzystują LoRa do komunikacji radiowej bez internetu. Każdy używa własnego protokołu, czyli własnego formatu i zasad przesyłania pakietów. Dlatego urządzenia z MeshCore i Meshtastic nie mogą bezpośrednio wymieniać wiadomości ani przekazywać ich dalej między tymi sieciami, nawet przy identycznych ustawieniach radia. [Format pakietów MeshCore](https://docs.meshcorepolska.org/packet-format) · [Protokół Meshtastic](https://meshtastic.org/docs/overview/mesh-algo/)

Ten sam sprzęt często może jednak działać z jednym albo drugim oprogramowaniem. Nie oznacza to obsługi obu sieci jednocześnie. Jeśli Twój model jest obsługiwany przez [flasher MeshCore](https://flasher.meshcore.io), możesz zastąpić Meshtastic oprogramowaniem MeshCore i dołączyć do sieci MeshCore.

## Czym różnią się płytki z nRF52 i ESP32?

To dwie najpopularniejsze rodziny mikrokontrolerów w urządzeniach dla MeshCore: nRF52 od Nordic Semiconductor i ESP32 od Espressif. Żaden z nich nie ma wbudowanego radia LoRa, odpowiada za nie osobny układ, np. `SX1262`. Sam wybór mikrokontrolera nie decyduje więc o zasięgu.

| Cecha | nRF52 | ESP32 |
| --- | --- | --- |
| Przykładowe urządzenia | RAK4631, Heltec T114, XIAO nRF52840, SenseCAP T1000-E | Heltec V4, XIAO ESP32-S3, LilyGO T-Beam, T-Deck |
| Wbudowana łączność | Bluetooth LE, bez Wi-Fi | Wi-Fi i Bluetooth LE (w modelach używanych zwykle w MeshCore) |
| Połączenie companiona z aplikacją | Bluetooth, USB | Bluetooth, USB, Wi-Fi (zależnie od wariantu firmware) |
| Pobór energii | Niski | Wyraźnie wyższy, zwłaszcza przy włączonym Wi-Fi |
| Zasilanie bateryjne i solarne | Zalecany wybór, wystarczy mniejszy akumulator i panel | Możliwe, ale wymaga większego akumulatora i panelu |
| Wydajność i pamięć | Mniejsze, ale w pełni wystarczające dla MeshCore | Zwykle większe, przydatne np. przy rozbudowanych ekranach |
| Cena płytek | Zwykle wyższa | Zwykle niższa |
| Aktualizacja bez kabla (OTA) | Przez Bluetooth | Przez Wi-Fi |
| Typowe zastosowanie w MeshCore | Przenośne companiony, trackery, repeatery solarne | Tanie companiony, repeatery i room serwery ze stałym zasilaniem |

Jeśli najważniejszy jest długi czas pracy na baterii, wybierz nRF52. Jeśli chcesz mieć połączenie z companionem w całym domu przez Wi-Fi (BLE ma mniejszy zasięg), wybierz ESP32. Rzeczywisty pobór prądu zależy też od konkretnej płytki, ekranu, GPS, wersji oprogramowania i natężenia ruchu w sieci.

Poradniki aktualizacji OTA: [nRF52](/aktualnosci/poradnik/aktualizacje-ota-nrf) · [ESP32](/aktualnosci/poradnik/aktualizacje-ota-esp)

## Dlaczego komputer nie widzi płytki do sflashowania?

Najczęstszą przyczyną problemu jest kabel USB. Oba rodzaje kabli mogą wyglądać identycznie, ale różnić się przeznaczeniem:

- **Kabel tylko do ładowania** - zazwyczaj ma 2 żyły i zapewnia wyłącznie zasilanie. Płytka się uruchomi, ale komputer jej nie wykryje.
- **Kabel do transmisji danych** - ma co najmniej 4 żyły: dwie do zasilania i dwie do transmisji danych (`D+` i `D-`). Tylko taki kabel umożliwi wgranie oprogramowania przez USB.

Najlepiej weź sprawdzony kabel, przez który udało Ci się już przesłać pliki, np. z telefonu na komputer. Jeśli płytka nadal nie jest widoczna:

1. Podłącz płytkę bezpośrednio do portu w komputerze, bez huba. Sprawdź inny port.
2. Zainstaluj sterownik konwertera USB-UART, jeśli Twoja płytka go używa: [CP210x](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers), [CH343/CH9102](https://www.wch-ic.com/downloads/CH343SER_EXE.html) lub [CH340/CH341](https://www.wch-ic.com/downloads/CH341SER_EXE.html).
3. Wprowadź urządzenie w tryb wgrywania oprogramowania (DFU). W tym trybie płytka nie uruchomi dotychczasowego oprogramowania, będzie oczekiwać na wgranie nowego:
   - **ESP32:** zwykle trzeba przytrzymać przycisk `PRG` (lub `BOOT`), nacisnąć `RST`, a następnie puścić pierwszy przycisk.
   - **nRF52:** zwykle wystarczy dwukrotnie nacisnąć `RST`, a w systemie pojawi się nowy dysk USB.

Do wgrywania przez [flasher MeshCore](https://flasher.meshcore.io) użyj przeglądarki Chrome lub Edge i zamknij inne programy, które mogą korzystać z portu szeregowego.
