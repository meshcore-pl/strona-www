---
title: Odświeżony generator regionów MeshCore
description: Wygeneruj plik z kanałami, repeaterami i presetem radiowym do aplikacji MeshCore. Sprawdź też strony województw, kanał RSS i zmiany w publicznym API.
createdAt: 26.11.2026
image: /images/screens/nowy-generator-regionow.png
imageAlt: Generator regionów MeshCore z wyborem sprzętu i ustawieniami repeatera
tags: [Społeczność, Narzędzia]
---

# Spore zmiany w generatorze regionów
W wersji **1.11.0** serwisu przebudowaliśmy [Generator regionów](/generator-regionow). Teraz możesz dodać kanały wraz z ich regionami w aplikacji MeshCore za pomocą jednego pliku. Dodaliśmy też statystyki według województw i rozszerzyliśmy publiczne API.

## Wybór sprzętu
Wybierz **Mam repeater i companiona** albo **Mam tylko companiona**. W obu wariantach zobaczysz kanały i ich regiony. Jeśli konfigurujesz też repeater, generator pokaże strukturę regionów oraz przygotuje komendy CLI do ich dodawania i usuwania.

Generator nadal jest w wersji beta. Błędy i propozycje nazw regionów możesz zgłaszać na [Discordzie](/discord) lub przez [formularz kontaktowy](/kontakt).

## Regiony dla wszystkich powiatów
Lista regionów lokalnych obejmuje teraz wszystkie powiaty i miasta na prawach powiatu. W generatorze znajdziesz je w grupach **Miasta i obszary** oraz **Powiaty**. Podziękowania dla [sstanczuk](https://github.com/sstanczuk) za przygotowanie nazw regionów powiatowych.

## Import z pliku
Pod tabelą kanałów kliknij **Eksportuj kanały do pliku** i zaznacz kanały, które chcesz dodać w aplikacji. Generator zapisze wybrane kanały wraz z ich regionami. Do pliku możesz też dodać kontakty repeaterów i preset radiowy.

- **Kontakty repeaterów** z Twojego województwa i wybranych województw sąsiednich. Wybierz limit kontaktów (30, 80 lub 150) i określ, z ilu ostatnich dni uwzględnić aktualizacje wpisów na mapie (od 1 do 60, domyślnie 5). Generator zaczyna od Twojego województwa. W każdym województwie najpierw uwzględnia repeatery z najnowszymi aktualizacjami.
- **Preset radiowy EU/UK Narrow** (`869,618 MHz`, `62,5 kHz`, `SF8`, `CR8`). Moc nadawania ustawiasz osobno.

Kliknij **Pobierz plik do importu**. Następnie w aplikacji MeshCore wybierz **Ustawienia → Importuj konfigurację** i wskaż pobrany plik.

> [!IMPORTANT]
> Przed importem wykonaj kopię zapasową przez **Eksportuj konfigurację**. Jeśli Twoja okolica korzysta z `SF6`, nie dodawaj do pliku presetu radiowego.

<video class="news-video" width="538" height="990" controls playsinline preload="metadata" aria-label="Import kanałów i regionów w aplikacji MeshCore">
	<source src="/pliki/aktualnosci/import-kanalow-i-regionow-meshcore.mp4" type="video/mp4">
	<a href="/pliki/aktualnosci/import-kanalow-i-regionow-meshcore.mp4">Pobierz nagranie importu kanałów i regionów</a>
</video>

## Statystyki według województw
Na [mapie i w tabeli województw](/statystyki#stats-voivodeships) zobaczysz łączną liczbę urządzeń oraz osobne zestawienia repeaterów, aktywnych repeaterów, room serwerów i companionów.

Za aktywny uznajemy repeater zgłoszony przez [Map Auto Uploader](https://github.com/recrof/map.meshcore.io-uploader), jeśli jego wpis na mapie zaktualizowano mniej niż 5 dni temu. W zestawieniu aktywnych mogą więc nie pojawić się wszystkie działające repeatery.

## Strony województw
Każde województwo ma teraz [własną stronę](/wojewodztwa). Znajdziesz na niej liczbę urządzeń, kanały, regiony lokalne i znane serwery Discord, a przyciskiem **Skonfiguruj regiony** otworzysz generator z wybranym województwem.

## Kanał RSS
Nowe wpisy możesz teraz śledzić w czytniku RSS. Dodaj w nim adres [kanału z wszystkimi aktualnościami](/aktualnosci/rss.xml):

```text
https://meshcorepolska.org/aktualnosci/rss.xml
```

Jeśli interesuje Cię tylko wybrany temat, otwórz stronę tagu, na przykład [Poradnik](/aktualnosci/poradnik), i kliknij przycisk **RSS**. Kanały zawierają 25 najnowszych wpisów wraz z pełną treścią.

## Publiczne API
Od teraz udostępniamy dane o regionach i kanałach, listy węzłów z wybranych województw oraz statystyki w podziale na województwa. Opisy parametrów i przykładowe odpowiedzi znajdziesz w [dokumentacji API](/dokumentacja/spolecznosc/api).

Poniższe polecenia pobierają kolejno dane o regionach i kanałach województwa zachodniopomorskiego, do 80 kontaktów repeaterów oraz statystyki wszystkich województw. Zapytanie o kontakty obejmuje województwa zachodniopomorskie i wielkopolskie oraz wpisy zaktualizowane w ciągu ostatnich 5 dni.

```bash
curl "https://meshcorepolska.org/api/v1/regions/voivodeships/zp"
curl "https://meshcorepolska.org/api/v1/nodes?voivodeship=zp,wp&type=repeater&days=5&limit=80"
curl "https://meshcorepolska.org/api/v1/stats/voivodeships"
```

Przez API pobierzesz też polskie wersje wpisów z bloga MeshCore w formacie Markdown. W parametrze `sourceUrl` podaj adres oryginalnego wpisu. Poniższy przykład pobiera polską wersję [poradnika o czujniku LD2410S](/aktualnosci/poradnik/czujnik-obecnosci-ld2410s).

```bash
curl --get "https://meshcorepolska.org/api/v1/news/post" --data-urlencode "sourceUrl=https://blog.meshcore.io/2026/11/26/motions-sensors"
```

Pozostałe zmiany opisaliśmy w [historii aktualizacji strony](/dokumentacja/spolecznosc/lista-zmian#v1110-26112026).
