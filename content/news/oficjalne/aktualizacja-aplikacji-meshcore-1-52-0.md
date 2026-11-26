---
title: MeshCore 1.52.0 - zakładka czatów, wygodniejsze rozmowy
description: MeshCore 1.52.0 wprowadza zakładkę czatów, podgląd wiadomości, filtry nieprzeczytanych rozmów i zapisywanie telemetrii w aplikacji. Sprawdź pełną listę zmian.
createdAt: 23.11.2026
themeColor: '#2a2c31'
tags: [Lista zmian, Aplikacja, Tłumaczenia]
---

# Aktualizacja aplikacji MeshCore 1.52.0

Wersja **1.52.0** oficjalnej aplikacji MeshCore wprowadza kolejne usprawnienia codziennego korzystania z sieci. Największą nowością jest zakładka **Czaty**, która zbiera wszystkie rozmowy w jednym miejscu. Zmiany obejmują też czytelność list, przechodzenie do nieprzeczytanych wiadomości i wyświetlanie telemetrii.

## Wszystkie rozmowy w jednym miejscu

Nowa zakładka czatów pokazuje rozmowy uporządkowane według najnowszych wiadomości. Zakładki kontaktów i kanałów nadal są dostępne, ale przy korzystaniu z czatów adverty i nowo odkryte węzły nie spychają już ostatnich rozmów w dół listy.

![Zakładki Czaty, Kontakty i Kanały w aplikacji MeshCore 1.52.0](/images/screens/meshcore-1-52-0-czaty-kontakty-kanaly.jpg)

Każda rozmowa ma podgląd ostatniej otrzymanej wiadomości. Jeśli zależy Ci na większej prywatności, możesz wyłączyć opcję **Pokaż podgląd wiadomości** w sekcji **Ustawienia wiadomości**.

Szybkie filtry pozwalają jednym dotknięciem wyświetlić tylko nieprzeczytane rozmowy lub ulubione. Pływający przycisk otwiera ekran **Nowy czat**, który ułatwia wyszukanie kontaktu lub kanału i rozpoczęcie rozmowy.

## Łatwiejsze nadrabianie wiadomości

Po otwarciu rozmowy aplikacja przechodzi teraz do najstarszej nieprzeczytanej wiadomości. Dzięki temu możesz kontynuować czytanie od miejsca, w którym skończyłeś, bez ręcznego przewijania historii. Odpowiada za to opcja **Przejdź do najstarszej wiadomości** w sekcji **Ustawienia wiadomości**. Możesz ją wyłączyć, jeśli wolisz dotychczasowe zachowanie.

Przycisk powrotu na ekranie rozmowy pokazuje liczbę pozostałych nieprzeczytanych rozmów. Nie trzeba już wychodzić z bieżącego czatu, aby sprawdzić, czy gdzieś czekają nowe wiadomości.

## Czytelniejszy interfejs i zapamiętana telemetria

Nazwy kontaktów i kanałów na ekranie głównym są teraz pogrubione. Zmieniono też rozmiar, kolory i obramowania awatarów kontaktów, aby były wyraźniejsze podczas przeglądania listy.

Telemetria jest teraz zapisywana w bazie danych aplikacji. Po wybraniu przycisku **Telemetria** w szczegółach kontaktu od razu zobaczysz ostatnie zapisane dane oraz informację o czasie ich ostatniej aktualizacji.

## Pełna lista zmian

- Dodano nowy proces konfiguracji companiona za pomocą linków otwieranych w aplikacji (deep linków) i kodów QR.
- Dodano przycisk kopiowania trasy powrotnej w menu ekranu podglądu trasy.
- Dodano zakładkę czatów z rozmowami uporządkowanymi według najnowszych wiadomości.
- Dodano na zakładce czatów przyciski szybkiego filtrowania nieprzeczytanych rozmów.
- Dodano na zakładce czatów przycisk rozpoczynania nowej rozmowy.
- Dodano możliwość przeglądania na zakładce czatów historii rozmów z usuniętymi kontaktami i kanałami.
- Dodano możliwość wyświetlania na zakładce czatów wiadomości alarmowych otrzymanych od węzłów z czujnikami.
- Pogrubiono nazwy kontaktów i kanałów na ekranie głównym.
- Klucze publiczne kontaktów są teraz wyświetlane czcionką o stałej szerokości i zostały przeniesione na dół wpisów na liście kontaktów ekranu głównego.
- Dostosowano rozmiar, kolory i obramowania awatarów kontaktów.
- Ekran rozmowy otwiera się teraz na najstarszej nieprzeczytanej wiadomości. Można to wyłączyć w ustawieniach wiadomości.
- Przeniesiono licznik nieprzeczytanych rozmów z ikon zakładek kontaktów i kanałów na ikonę zakładki czatów.
- Przycisk powrotu na ekranie rozmowy pokazuje teraz liczbę pozostałych nieprzeczytanych rozmów.
- Telemetria jest teraz zapisywana w bazie danych aplikacji i wyświetlana od razu po otwarciu jej podglądu.

Autor aplikacji zapowiada osobne omówienie nowych kodów QR i deep linków służących do konfiguracji companiona.

## Brakujące tłumaczenia

Nie udało nam się przygotować na czas wszystkich tłumaczeń do tego wydania. Część nowych opcji i komunikatów będzie więc tymczasowo wyświetlana po angielsku. Poniżej znajdziesz ich polskie odpowiedniki.

| Tekst w aplikacji | Sugerowane tłumaczenie |
|-------------------|-----------------------|
| No Telemetry | Brak telemetrii |
| No Sensors | Brak czujników |
| Select contacts to see their telemetry here. | Wybierz kontakty, aby zobaczyć ich telemetrię. |
| `{count,plural, =1{{count} Sensor} other{{count} Sensors}}` | `{count,plural, =1{{count} czujnik} few{{count} czujniki} other{{count} czujników}}` |
| Refresh All | Odśwież wszystko |
| DMs | Wiad. prywatne |
| Yesterday | Wczoraj |

## Pobierz aplikację

- [Pliki do pobrania wersji 1.52.0](https://files.liamcottle.net/MeshCore/v1.52.0/)
- [App Store](https://apps.apple.com/nz/app/meshcore/id6742354151)
- [Google Play](https://play.google.com/store/apps/details?id=com.liamcottle.meshcore.android)
