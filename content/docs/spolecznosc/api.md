---
title: Publiczne API
description: Adresy, parametry i przykładowe odpowiedzi publicznego API MeshCore Polska. Regiony i kanały, węzły, statystyki sieci i aktualności.
canonical: /dokumentacja/spolecznosc/api
createdAt: 26.11.2026
themeColor: '#10131b'
---

# Publiczne API MeshCore Polska {toc: Wstęp}
Przez API możesz pobrać listy regionów, kanałów i węzłów, statystyki sieci oraz polskie wersje wpisów z bloga MeshCore. Wszystkie opisane tu zasoby są dostępne przez `GET` i nie wymagają klucza API.


## Adres bazowy
Ścieżki podane w dokumentacji dopisz do poniższego adresu.

```text
https://meshcorepolska.org/api/v1
```


## Format odpowiedzi
API zwraca odpowiedzi w formacie JSON. Pole `status` zawiera kod HTTP. Po udanym żądaniu `success` ma wartość `true`, a wynik znajduje się w polu `data`.

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
> - Serwer zwraca `400`, gdy brakuje wymaganego parametru zapytania lub jego wartość jest nieprawidłowa. Kod `404` oznacza, że ścieżka lub zasób nie istnieje.
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

Kody województw składają się z dwóch liter, np. `zp`. Wyjątkiem jest województwo wielkopolskie z kodem `wlkp`. Przykładowy kod regionu lokalnego to `zp-zkl`.

### Pełna lista regionów i kanałów
Odpowiedź na `GET /regions` zawiera w obiekcie `data` poniższe pola.

| Pole | Opis |
|---|---|
| `country` | region krajowy |
| `voivodeships` | lista województw |
| `localRegions` | lista regionów lokalnych |
| `commonChannels` | lista kanałów wspólnych |
| `channelDescriptions` | opisy wybranych kanałów, z nazwami kanałów jako kluczami |

Kanałów wspólnych można używać bez regionu lub z regionem uzgodnionym lokalnie. Kanału `#emergency` zalecamy używać bez regionu.

### Województwo
W przykładzie odpowiedzi na `GET /regions/voivodeships/zp` lista `localRegions` została skrócona do jednego wpisu.

```json
{
  "success": true,
  "status": 200,
  "message": "OK",
  "data": {
    "code": "zp",
    "slug": "zachodniopomorskie",
    "name": "zachodniopomorskie",
    "scope": "pl-zp",
    "parentScope": "pl",
    "channels": ["#zachodniopomorskie"],
    "neighbors": ["pm", "wlkp", "lb"],
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
| `slug` | nazwa województwa używana w adresie jego strony (tylko województwa) |
| `name` | nazwa województwa lub obszaru |
| `scope` | nazwa regionu w MeshCore |
| `parentScope` | nazwa regionu nadrzędnego w MeshCore |
| `channels` | lista kanałów przypisanych do regionu, może być pusta |
| `neighbors` | kody sąsiednich województw (tylko województwa) |
| `voivodeships` | kody województw, w których występuje region (tylko regiony lokalne) |
| `automatic` | `true`, jeśli generator automatycznie dodaje region dla przypisanych mu województw, np. `zachod` (tylko regiony lokalne) |
| `socials` | linki społeczności, np. `discord`. Jeśli ich brak, wartością jest pusty obiekt |

Wiele nazw regionów powiatowych ma charakter roboczy i czeka na uzgodnienie z lokalnymi grupami.


## Węzły
`GET /nodes` zwraca węzły z wybranych województw w formacie kontaktów aplikacji MeshCore. [Generator regionów](/generator-regionow) pobiera je stąd i może dodać do pliku importu.

| Parametr | Wartości | Domyślnie |
|---|---|---|
| `voivodeship` | co najmniej jeden kod województwa | parametr wymagany |
| `type` | co najmniej jeden z typów: `client`, `repeater`, `roomServer`, `sensor` | `repeater` |
| `days` | ile ostatnich dni uwzględnić przy filtrowaniu po dacie aktualizacji wpisu na mapie, liczba całkowita od `1` do `60` | `5` |
| `limit` | maksymalna liczba wyników, liczba całkowita od `1` do `350` | `350` |

Kilka województw lub typów węzłów podaj po przecinku, bez spacji. API zwraca wyniki w kolejności podanych województw. W obrębie każdego województwa na początku listy są węzły z ostatnio aktualizowanymi wpisami.

Przykładowe żądanie to `GET /nodes?voivodeship=zp,wlkp&type=repeater&days=7&limit=100`.

```json
{
  "success": true,
  "status": 200,
  "message": "OK",
  "data": [
    {
      "type": 2,
      "name": "Przykładowy repeater",
      "custom_name": null,
      "public_key": "0000000000000000000000000000000000000000000000000000000000000000",
      "flags": 0,
      "latitude": "53.4285",
      "longitude": "14.5528",
      "last_advert": 1795724288,
      "last_modified": 1795723587,
      "out_path_list": null
    }
  ]
}
```

Pole `type` przyjmuje wartości `1` (client), `2` (repeater), `3` (room server) i `4` (sensor). Pola `last_advert` i `last_modified` zawierają odpowiednio czas ostatniego advertu i ostatniej aktualizacji wpisu, w sekundach od początku epoki Unix. Jeśli dane nie są dostępne, serwer zwraca `503`.


## Statystyki sieci

### Stan bieżący
`GET /stats`

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
| `status` | liczba repeaterów w każdej kategorii opisanej poniżej |
| `lastRefreshedAt` | czas ostatniego odświeżenia danych w formacie ISO 8601 lub `null`, jeśli czas odświeżenia jest nieznany |

W przypadku repeaterów zgłoszonych przez Map Auto Uploader kategoria zależy od czasu od ostatniej aktualizacji wpisu na mapie.

| Status | Czas od aktualizacji |
|---|---|
| `recent` | mniej niż 5 dni |
| `stale` | od 5 do mniej niż 10 dni |
| `old` | od 10 do mniej niż 20 dni |
| `extinct` | co najmniej 20 dni |

Repeatery dodane ręcznie mają status `none`. Jeśli dane nie są dostępne, serwer zwraca `503`.

### Historia
`GET /stats/history`

| Parametr | Wartości | Domyślnie |
|---|---|---|
| `region` | `pl` lub `all` | `pl` |
| `days` | liczba całkowita od `1` do `365` lub `all` (cała dostępna historia) | `90` |

Pole `data` zawiera dzienne statystyki w kolejności od najstarszych do najnowszych. Każdy wpis ma pole `date` (`RRRR-MM-DD`) oraz pola `total`, `active`, `nodes`, `types` i `status` opisane w sekcji „Stan bieżący”.


### Województwa
`GET /stats/voivodeships`

Pole `data` zawiera listę `voivodeships` i czas ostatniego odświeżenia danych w polu `lastRefreshedAt`. Każdy wpis zawiera kod (`code`), nazwę (`name`) i te same pola statystyk co w sekcji „Stan bieżący”. API przypisuje węzły do województw na podstawie współrzędnych. Jeśli dane nie są dostępne, serwer zwraca `503`.

Granice województw: © autorzy [OpenStreetMap](https://www.openstreetmap.org/copyright), licencja ODbL.


## Kody miejscowości
Z tych danych korzysta [Generator nazw](/generator-nazw).

| Adres | Zwraca |
|---|---|
| `/locodes` | wszystkie kody miejscowości |
| `/locodes?voivodeship={code}` | kody z wybranego województwa |

Pole `data` zawiera listę wpisów z polami `code` (kod UN/LOCODE bez `PL`), `name` i `voivodeship`. Pole `voivodeship` ma wartość `null`, jeśli województwa nie udało się ustalić.


## Aktualności

| Adres | Zwraca |
|---|---|
| `/news/sources` | obiekt, w którym kluczem jest adres oryginalnego wpisu, a wartością ścieżka jego polskiej wersji |
| `/news/post?sourceUrl={url}` | ścieżkę (`url`), tytuł (`title`) i treść w formacie Markdown (`markdown`) polskiej wersji wskazanego wpisu. Linki i adresy plików z tego serwisu w polu `markdown` są pełne |

W parametrze `sourceUrl` podaj dokładnie taki adres, jaki zwraca `GET /news/sources`. Wartość parametru zakoduj np. za pomocą `URLSearchParams`. Jeśli API nie znajdzie polskiej wersji podanego wpisu, zwróci `404`.
