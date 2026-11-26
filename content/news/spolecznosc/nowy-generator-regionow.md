---
title: Nowy generator regionów i import ustawień do aplikacji
description: Nowy generator regionów MeshCore pozwala pobrać plik z kanałami, repeaterami i presetem radiowym. Zobacz też statystyki według województw i nowe zasoby API.
createdAt: 26.11.2026
tags: [Społeczność, Narzędzia]
---

# Nowy generator regionów i import ustawień do aplikacji
W wersji **1.11.0** strony przebudowaliśmy [Generator regionów](/generator-regionow). Teraz możesz dodać kanały wraz z ich zakresami za jednym razem, importując plik w aplikacji MeshCore. Dodaliśmy też statystyki według województw i rozszerzyliśmy publiczne API.

## Generator dopasowany do Twojego sprzętu
Na początku wybierz, czy masz **repeater i companiona**, czy **tylko companiona**. W obu wariantach zobaczysz kanały i ich zakresy. Jeśli konfigurujesz też repeater, generator przygotuje komendy CLI, pokaże strukturę regionów i pomoże usunąć stare regiony.

Należy pamiętać, że to nadal wersja beta. Błędy i propozycje nazw regionów zgłoś na [serwerze Discord](/discord) lub przez [formularz kontaktowy](/kontakt).

## Regiony dla wszystkich powiatów
Lista regionów lokalnych obejmuje teraz wszystkie powiaty i miasta na prawach powiatu. W generatorze znajdziesz je w grupach **Miasta i obszary** oraz **Powiaty**. Podziękowania dla [sstanczuk](https://github.com/sstanczuk) za przygotowanie nazw regionów powiatowych.

## Import z pliku
Pod tabelą kanałów kliknij **Eksportuj kanały do pliku**. Wybierz, co ma trafić do pliku:

- **Kanały** wraz z przypisanymi zakresami regionów.
- **Repeatery** z Twojego województwa i wybranych sąsiednich województw. Ustaw limit kontaktów (30, 80 lub 150) i wybierz, z ilu ostatnich dni uwzględnić aktualizacje na mapie (od 1 do 60, domyślnie 5). Generator najpierw doda repeatery z Twojego województwa, zaczynając od ostatnio widzianych.
- **Preset radiowy EU/UK Narrow** (`869,618 MHz`, `62,5 kHz`, `SF8`, `CR8`). Plik nie zawiera ustawienia mocy nadawania.

Kliknij **Pobierz plik do importu**. Następnie w aplikacji MeshCore wybierz **Ustawienia → Importuj konfigurację** i wskaż pobrany plik.

> [!IMPORTANT]
> Przed importem wykonaj kopię zapasową przez **Eksportuj konfigurację**. Jeśli Twoja okolica korzysta z `SF6`, nie dodawaj do pliku presetu radiowego.

<video class="news-video" width="538" height="990" controls playsinline preload="metadata" aria-label="Import kanałów i regionów w aplikacji MeshCore">
	<source src="/pliki/aktualnosci/import-kanalow-i-regionow-meshcore.mp4" type="video/mp4">
	<a href="/pliki/aktualnosci/import-kanalow-i-regionow-meshcore.mp4">Pobierz nagranie importu kanałów i regionów</a>
</video>

## Statystyki według województw
Mapa i tabela na stronie [Statystyki](/statystyki#stats-voivodeships) pozwalają porównać województwa pod względem liczby urządzeń ogółem oraz liczby repeaterów, aktywnych repeaterów, room serwerów i companionów.

W statystykach za aktywny uznajemy repeater, którego advert trafił na mapę w ciągu ostatnich 5 dni za pośrednictwem [Map Auto Uploadera](https://github.com/recrof/map.meshcore.io-uploader). Część działających repeaterów może nie pojawić się w tych statystykach.

## Publiczne API
Udostępniamy od teraz w publicznym API dane o regionach i kanałach, listy węzłów z wybranych województw oraz statystyki w podziale na województwa. W [dokumentacji API](/dokumentacja/spolecznosc/api) opisaliśmy też, jak pobrać polskie tłumaczenia wpisów z oficjalnego bloga MeshCore.

Pozostałe zmiany opisaliśmy w [historii aktualizacji strony](/dokumentacja/spolecznosc/lista-zmian#v1110-26112026).
