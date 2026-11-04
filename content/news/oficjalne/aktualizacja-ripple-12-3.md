---
title: Zmiany w Ripple UI 12.3 - mapy ePaper, Wi-Fi i kompas
description: Ripple UI 12.3 wprowadza dithering map na ekranach ePaper, pobieranie kafelków przez Wi-Fi, poprawki stabilności i obsługę nowych urządzeń Seeed.
createdAt: 03.11.2026
themeColor: '#99a0a7'
sourceUrl: https://blog.meshcore.io/2026/11/03/ripple-12.3
tags: [Oprogramowanie, Lista zmian]
---

# Ripple UI v12.3 - mapy ePaper, pobieranie przez Wi-Fi i nowe urządzenia
Najnowsze wydanie firmware z interfejsem Ripple UI przynosi szereg poprawek i usprawnień:

- Urządzenia z ekranami ePaper (Pro, Max i T5) obsługują teraz dithering kolorowych kafelków mapy.
- Naprawiono błędy powodujące awarie.
- Dodano pobieranie kafelków mapy przez Wi-Fi.
- Dodano obsługę nowych urządzeń: MeshPager X2 i WIO Tracker L2 Pro.
- Dodano strzałkę wskazującą kierunek na podstawie GPS.
- Poprawiono obsługę wielobajtowych tras, m.in. w pakietach rozgłoszeniowych (advertach).
- Rozpoczęto wycofywanie obsługi sieci Ripple.

## Mapy na ekranach ePaper
Firmware dla T-Deck Max, T-Deck Pro i T5 Pro pozwala teraz przełączać się między zestawami kafelków mapy: dedykowanymi kafelkami czarno-białymi z folderu `/tiles-bw` oraz standardowymi, kolorowymi kafelkami OSM z folderu `/tiles`.

Kolorowe kafelki są teraz przetwarzane z użyciem ditheringu i wyglądają zaskakująco dobrze. Odwzorowanie kolorów nie zawsze jest idealne, dlatego próg kontrastu używany przez algorytm można ręcznie dostosować skrótami **ALT+1** do **ALT+9**. Poniżej ten sam widok mapy z ustawieniami kontrastu wybranymi kolejno skrótami **ALT+5**, **ALT+4** i **ALT+3**.

![Porównanie mapy na ekranie ePaper przy trzech ustawieniach kontrastu](https://blog.meshcore.io/assets/images/2026/11/03/epaper-maps.png)

Na nowym ekranie ustawień **Display** (Wyświetlacz) dostępna jest opcja wyboru zestawu kafelków mapy:

![Wybór zestawu kafelków mapy w ustawieniach wyświetlacza](https://blog.meshcore.io/assets/images/2026/11/03/new-prefs.png)

## Poprawki stabilności
Znaleziono trzy odrębne błędy związane z wielobajtowymi trasami oraz dziennikiem odbioru `rxlog` na ekranie **Diagnostics** (Diagnostyka). Awarie występowały bardzo sporadycznie, ale jak dotąd wersja v12.3 sprawia wrażenie bardzo stabilnej.

## Pobieranie kafelków mapy
Dodano osobny ekran konfiguracji **WiFi**, dostępny z menu **Extra** na ekranie głównym:

![Ekran konfiguracji Wi-Fi w Ripple UI 12.3](https://blog.meshcore.io/assets/images/2026/11/03/wifi-config.png)

Po wprowadzeniu zmian naciśnij **ENTER**, aby je zapisać. Następnie pojawi się prośba o ponowne uruchomienie urządzenia w celu zastosowania ustawień. Jest to nieco uciążliwe, ale pozostawienie Wi-Fi wyłączonego od momentu uruchomienia urządzenia znacząco ogranicza zużycie energii.

Po włączeniu pobierania przez Wi-Fi w menu powinna pojawić się pomarańczowa kropka, która oznacza pomyślne nawiązanie połączenia:

![Pomarańczowy wskaźnik połączenia Wi-Fi w menu](https://blog.meshcore.io/assets/images/2026/11/03/wifi-menu.png)

> [!NOTE]
> Na urządzeniach z ekranem ePaper pobieranie kafelków mapy działa wyłącznie po wybraniu zestawu `color`!

Po włączeniu tej funkcji kafelki są pobierane i zapisywane na karcie SD na żądanie, podczas przybliżania i przesuwania mapy. Na razie nie ma możliwości pobierania całych zestawów kafelków naraz.

## Nowo obsługiwane urządzenia
Dodano obsługę dwóch nowych urządzeń:

- Seeed MeshPager X2
- Seeed WIO Tracker L2 Pro

## Kompas i wskazanie kierunku
Podczas ruchu urządzenia wyświetlana jest teraz niebieska strzałka wskazująca kierunek. W nowych urządzeniach z kompasem cyfrowym (X2, L2 i M9) strzałka jest widoczna także podczas postoju i obraca się wraz z urządzeniem. Urządzenie musi być trzymane poziomo.

Kompas cyfrowy wymaga kalibracji. W menu **Extra** na ekranie głównym pojawiła się nowa opcja **Calibrate Compass** (Kalibruj kompas).

## Wycofywanie profili sieci Ripple
Wersja 12.3 rozpoczyna wycofywanie obsługi profili sieci Ripple. Sieć MeshCore już dawno ją przyćmiła, dlatego w tym wydaniu nie można już tworzyć nowych profili sieci Ripple.

Istniejące profile Ripple nadal można wczytywać, ale w przyszłych wydaniach obsługa tego typu profili zostanie całkowicie usunięta.

## Pobieranie
Nowe wersje firmware są dostępne w [MeshCore Flasher](https://flasher.meshcore.io).
