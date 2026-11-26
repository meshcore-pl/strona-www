---
title: Publiczne API MeshCore Polska
description: Dokumentacja publicznego API MeshCore Polska. Adresy, parametry i przykładowe odpowiedzi JSON dla regionów i kanałów, statystyk sieci oraz aktualności.
canonical: /dokumentacja/spolecznosc/api
createdAt: 26.11.2026
themeColor: '#10131b'
---

# Publiczne API MeshCore Polska {toc: Wstęp}
API udostępnia dane o regionach i kanałach, statystyki sieci oraz aktualności. Wszystkie opisane tu żądania używają metody `GET` i działają bez klucza API.


## Adres bazowy
Ścieżki podane w dokumentacji dopisz do poniższego adresu.

```text
https://meshcorepolska.org/api/v1
```


## Format odpowiedzi
API zwraca odpowiedzi w formacie JSON. Pole `status` zawiera kod HTTP, a `data` zawiera wynik udanego żądania.

```json
{
  "success": true,
  "status": 200,
  "message": "OK",
  "data": {}
}
```

Przy błędzie pole `success` ma wartość `false`, a `message` opisuje przyczynę.

```json
{
  "success": false,
  "status": 404,
  "message": "Nie znaleziono województwa."
}
```

> [!NOTE]
> - Limit wynosi 100 żądań na minutę z jednego adresu IP, łącznie dla API i stron serwisu. Po przekroczeniu limitu serwer zwraca `429`.
> - Serwer zwraca `400` przy nieprawidłowym parametrze zapytania oraz `404`, gdy ścieżka lub zasób nie istnieje.
> - API obsługuje żądania CORS z dowolnego źródła w trybie bez poświadczeń.


## Regiony i kanały
Z tych danych korzysta [Generator regionów](/generator-regionow). Schemat regionów opisano w artykule o [regionalizacji wiadomości](/dokumentacja/meshcore/regionalizacja-wiadomosci).

| Adres | Zwraca |
|---|---|
| `/regions` | wszystkie dane o regionach i kanałach |
| `/regions/voivodeships` | listę województw |
| `/regions/voivodeships/{code}` | województwo wraz z jego regionami lokalnymi |
| `/regions/local` | listę regionów lokalnych |
| `/regions/local?voivodeship={code}` | regiony lokalne wybranego województwa |
| `/regions/local/{code}` | jeden region lokalny |

Kody województw składają się z dwóch liter, np. `zp`. W API województwo wielkopolskie ma kod `wp`, a w MeshCore jego region nazywa się `wlkp`. Przykładowy kod regionu lokalnego to `zp-zkl`.

### Pełna lista regionów i kanałów
Odpowiedź na `GET /regions` zawiera w obiekcie `data` poniższe pola.

| Pole | Opis |
|---|---|
| `country` | region krajowy |
| `voivodeships` | lista województw |
| `localRegions` | lista regionów lokalnych |
| `commonChannels` | kanały wspólne, używane bez regionu lub z zakresem uzgodnionym lokalnie, z zaleceniem używania `#emergency` bez regionu |
| `channelDescriptions` | obiekt z opisami wybranych kanałów, indeksowany nazwą kanału |

### Województwo
W przykładzie odpowiedzi na `GET /regions/voivodeships/zp` lista `localRegions` została skrócona do jednego wpisu.

```json
{
  "success": true,
  "status": 200,
  "message": "OK",
  "data": {
    "code": "zp",
    "name": "zachodniopomorskie",
    "scope": "pl-zp",
    "parentScope": "pl",
    "channels": ["#zachodniopomorskie"],
    "neighbors": ["pm", "wp", "lb"],
    "socials": {},
    "localRegions": [
      {
        "code": "zp-zkl",
        "name": "powiat kołobrzeski",
        "scope": "zp-zkl",
        "parentScope": "pl-zp",
        "voivodeships": ["zp"],
        "automatic": false,
        "channels": ["#kolobrzeg"],
        "socials": {}
      }
    ]
  }
}
```

| Pole | Opis |
|---|---|
| `code` | kod używany w adresach API |
| `name` | nazwa województwa lub obszaru |
| `scope` | nazwa regionu w MeshCore |
| `parentScope` | nazwa regionu nadrzędnego w MeshCore |
| `channels` | kanały przypisane do regionu, lista może być pusta |
| `neighbors` | kody sąsiednich województw (tylko województwa) |
| `voivodeships` | kody województw, w których występuje region (tylko regiony lokalne) |
| `automatic` | `true`, jeśli generator automatycznie dodaje region dla przypisanych mu województw, np. `zachod` (tylko regiony lokalne) |
| `socials` | obiekt z linkami społeczności, np. pod kluczem `discord`. Może być pusty |

Wiele nazw regionów powiatowych ma charakter roboczy i czeka na uzgodnienie z lokalnymi grupami.


## Statystyki sieci

### Stan bieżący
`GET /repeater-stats`

| Parametr | Wartości | Domyślnie |
|---|---|---|
| `region` | `pl` (Polska) lub `all` (cały świat) | `pl` |

```json
{
  "success": true,
  "status": 200,
  "message": "OK",
  "data": {
    "total": 3079,
    "active": 2083,
    "nodes": 4065,
    "types": { "client": 853, "repeater": 3079, "roomServer": 127, "sensor": 6 },
    "status": { "recent": 2083, "stale": 166, "old": 195, "extinct": 161, "none": 474 },
    "lastRefreshedAt": "2026-11-26T19:20:01.706Z"
  }
}
```

| Pole | Opis |
|---|---|
| `total` | liczba repeaterów |
| `active` | liczba repeaterów ze statusem `recent` |
| `nodes` | liczba wszystkich węzłów |
| `types` | liczba węzłów według typu |
| `status` | liczba repeaterów według czasu od ostatniej aktualizacji: `recent` (mniej niż 5 dni), `stale` (od 5 do mniej niż 10 dni), `old` (od 10 do mniej niż 20 dni), `extinct` (co najmniej 20 dni), `none` (repeatery dodane ręcznie) |
| `lastRefreshedAt` | czas ostatniego odświeżenia danych w formacie ISO 8601 lub `null`, jeśli czas odświeżenia jest nieznany |

Jeśli dane nie są dostępne, serwer odpowiada kodem `503`.

### Historia
`GET /stats/history`

| Parametr | Wartości | Domyślnie |
|---|---|---|
| `region` | `pl` lub `all` | `pl` |
| `days` | liczba całkowita od `1` do `365` lub `all` (cała dostępna historia) | `90` |

Pole `data` zawiera dzienne statystyki w kolejności od najstarszych do najnowszych. Każdy wpis ma pole `date` (`RRRR-MM-DD`) oraz pola `total`, `active`, `nodes`, `types` i `status` opisane w sekcji „Stan bieżący”.


## Aktualności

| Adres | Zwraca |
|---|---|
| `/news/sources` | obiekt, w którym kluczem jest adres oryginalnego wpisu, a wartością ścieżka jego polskiej wersji |
| `/news/post?sourceUrl={url}` | ścieżkę (`url`), tytuł (`title`) i treść w formacie Markdown (`markdown`) polskiej wersji wskazanego wpisu |

W parametrze `sourceUrl` podaj adres oryginalnego wpisu. Zakoduj jego wartość jak parametr URL, np. za pomocą `URLSearchParams`. Jeśli API nie znajdzie polskiej wersji podanego wpisu, zwróci `404`.
