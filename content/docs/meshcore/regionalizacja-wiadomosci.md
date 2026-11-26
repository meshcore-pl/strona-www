---
title: Regionalizacja wiadomości
description: Jak działa regionalizacja wiadomości kanałowych w MeshCore - konfiguracja CLI, ustawianie regionu w aplikacji i schemat regionów w Polsce.
canonical: /dokumentacja/meshcore/regionalizacja-wiadomosci
createdAt: 3.08.2026
updatedAt: 26.11.2026
---

# Regionalizacja wiadomości - filtrowanie kanałów w MeshCore {toc: Regionalizacja wiadomości}

> [!IMPORTANT]
> Nazwy regionów wynikają z ustaleń społeczności i mogą się różnić w zależności od obszaru. Dokument jest w trakcie opracowywania.

Na kanałach pojawia się zbyt wiele wiadomości z drugiego końca Polski, a przy sprzyjającej propagacji nawet z innych części Europy?
Regionalizacja pozwala ograniczyć liczbę takich wiadomości na kanałach z ustawionym regionem. Określa, które repeatery mogą je przekazywać, dzięki czemu zmniejsza obciążenie sieci i ułatwia śledzenie lokalnych rozmów. Nie każdy przecież chce, aby jego wiadomości były wysyłane poza jego miasto.

> [!TIP]
> Nie chcesz układać komend ręcznie? [Generator regionów](https://meshcorepolska.org/generator-regionow) przygotuje komendy CLI dla repeatera oraz listę kanałów i ich regionów do ustawienia w aplikacji.


## Jak to działa
Repeater decyduje o przekazaniu wiadomości na podstawie swojej listy regionów:

| Konfiguracja repeatera              | Wiadomość bez regionu | Wiadomość z regionem `pl-zp` |
| ----------------------------------- | --------------------- | ---------------------------- |
| brak regionów (domyślnie)           | przekazuje            | odrzuca                      |
| `pl-zp` z włączonym przekazywaniem  | przekazuje            | przekazuje                   |
| `pl-zp` z wyłączonym przekazywaniem | przekazuje            | odrzuca                      |
| brak `pl-zp` na liście              | przekazuje            | odrzuca                      |

Wiadomość z regionem dociera więc tylko tak daleko, jak sięga łańcuch repeaterów obsługujących ten region - jeden nieskonfigurowany repeater po drodze może przerwać ten łańcuch. Dlatego konfigurację zaczyna się od repeaterów, a dopiero potem ustawia regiony na companionie.

> [!NOTE]
> - Do kanału można przypisać maksymalnie jeden region. Region wiadomości prywatnych i advertów określa [domyślny region](#domyslny-region).
> - Kanał `Public` powinien być zawsze bez regionu. Do rozmów regionalnych służą inne, dedykowane kanały. W niektórych częściach Polski bywa mimo to przypisany do regionu (np. `pl`, `wlkp`, `pl-mz`, `zachod`), co nie jest dobrą praktyką.
> - Ruch bez regionu (`*`) można zablokować komendą `region denyf *`, ale obecnie nie jest to zalecane. Łagodniejszą alternatywą (firmware 1.16+) jest ograniczenie jego zasięgu, np. `set flood.max.unscoped 3`.
> - Region to tylko etykieta, **nie** szyfrowanie.

Nazwa regionu to uzgodniona przez społeczność etykieta, np. kraju, województwa lub miasta. Urządzenia korzystające z danego regionu muszą używać identycznej nazwy - każda literówka oznacza inny region. Używaj tylko małych liter, cyfr i myślników, bez prefiksu `#`. Nazwa może mieć maksymalnie 29 bajtów. Wielkość liter ma znaczenie: `PL` i `pl` to dwa różne regiony.


## Schemat regionów wdrożony w Polsce {toc: Schemat regionów}
Region krajowy to `pl`, a pod nim znajdują się regiony wojewódzkie.
Ich nazwy w większości pochodzą z literowych kodów [ISO 3166-2:PL](https://pl.wikipedia.org/wiki/ISO_3166-2:PL#Kody_przed_26_listopada_2018) sprzed 26 listopada 2018 r., zapisanych małymi literami, np. `pl-zp`.
Wyjątkiem w opisanych konfiguracjach jest województwo wielkopolskie, w którym funkcjonuje region `wlkp` zamiast `pl-wp`.

| Obszar              | Region  | Kanały                         |
|---------------------|---------|--------------------------------|
| Polska              | `pl`    | `#polska`                      |
| Dolnośląskie        | `pl-ds` | `#dolnoslaskie`, `#ds-test`    |
| Kujawsko-pomorskie  | `pl-kp` | `#kp`                          |
| Lubelskie           | `pl-lu` | `#lubelskie`, `#lublin`        |
| Lubuskie            | `pl-lb` | `#lubuskie`                    |
| Łódzkie             | `pl-ld` | `#lodzkie`                     |
| Małopolskie         | `pl-ma` | `#malopolskie`, `#krakow`      |
| Mazowieckie         | `pl-mz` | `#mazowsze`, `#bot`            |
| Opolskie            | `pl-op` | `#opolskie`                    |
| Podkarpackie        | `pl-pk` | `#podkarpackie`, `#testing`    |
| Podlaskie           | `pl-pd` | `#podlaskie`                   |
| Pomorskie           | `pl-pm` | `#pm`                          |
| Śląskie             | `pl-sl` | `#slaskie`, `#botslaskie`      |
| Świętokrzyskie      | `pl-sk` | `#swietokrzyskie`, `#kielce`   |
| Warmińsko-mazurskie | `pl-wn` | `#warminsko-mazurskie`         |
| Wielkopolskie       | `wlkp`  | `#wlkp`, `#poznan`, `#weather` |
| Zachodniopomorskie  | `pl-zp` | `#zachodniopomorskie`          |

Kanał nazwany od miasta może korzystać z regionu wojewódzkiego. Na przykład kanał `#krakow` korzysta z regionu `pl-ma`.

### Regiony lokalne

Pod regionem wojewódzkim można dodać region lokalny, np. miasta lub powiatu. Region lokalny jest opcjonalny i nie zastępuje wojewódzkiego ani krajowego.

#### Miasta i obszary o własnych nazwach

| Obszar                              | Region   | Region nadrzędny | Kanały                   |
|-------------------------------------|----------|------------------|--------------------------|
| Bydgoszcz i powiat bydgoski         | `bzg`    | `pl-kp`          | `#bydgoszcz`             |
| Warszawa                            | `waw`    | `pl-mz`          | `#warszawa`              |
| Rzeszów i powiat rzeszowski         | `rze`    | `pl`             | `#rzeszow`               |
| Wrocław i powiat wrocławski         | `wro`    | `pl-ds`          | `#wroclaw`, `#wroc-tech` |
| Zielona Góra i powiat zielonogórski | `zgora`  | `pl-lb`          | brak danych              |
| Zachód Polski                       | `zachod` | `pl`             | `#zachod`, `#szczecin`   |
| Łódź i powiat łódzki wschodni       | `ldz`    | `pl-ld`          | `#lodz`                  |
| Trójmiasto i powiat gdański         | `gdn`    | `pl-pm`          | `#pomorskie`, `#bot`     |

Wspólny region `zachod` jest stosowany w konfiguracjach województw dolnośląskiego, lubuskiego, wielkopolskiego i zachodniopomorskiego. Region `rze` leży w hierarchii bezpośrednio pod `pl`, a nie pod `pl-pk`.

#### Powiaty

Nazwy regionów dla pozostałych powiatów i miast na prawach powiatu zwykle łączą skrót województwa z wyróżnikiem z tablic rejestracyjnych. Oba człony zapisuje się małymi literami i oddziela myślnikiem. W Wielkopolsce w nazwach regionów powiatowych używa się skrótu `wp`, np. `wp-pgn`. Część miast na prawach powiatu ma wspólny region z otaczającym je powiatem.

| Obszar                     | Region   | Region nadrzędny | Kanał        |
|----------------------------|----------|------------------|--------------|
| Powiat kołobrzeski         | `zp-zkl` | `pl-zp`          | `#kolobrzeg` |
| Powiat siedlecki i Siedlce | `mz-wsi` | `pl-mz`          | `#siedlce`   |

Wyjątki od tej reguły to m.in. `poz`, `ol`, `czw` i `jo`.

Większość nazw regionów powiatowych to propozycje, które czekają na uzgodnienie z lokalnymi grupami. Przed konfiguracją sprawdź, jakich nazw używają okoliczne repeatery, i kieruj się ustaleniami lokalnej społeczności.

### Kanały wspólne

Kanał `#emergency` służy do łączności w sytuacjach kryzysowych oraz testów łączności awaryjnej organizowanych 13. dnia każdego miesiąca o 20:00. Jest używany zawsze bez regionu.

Kanały `#test`, `#bot` i `#info` mogą być używane bez regionu lub z regionem uzgodnionym lokalnie:
- Wielkopolska: w zależności od miejscowości kanały `#test` i `#info` są używane z regionem `wlkp` lub bez regionu.
- Warszawa: `#bot` i `#test` mogą korzystać z regionu `waw`, a `#bot` także z `pl-mz`.
- Trójmiasto: `#bot` może korzystać z lokalnego regionu `gdn`.


## Konfiguracja repeatera
Przykład dla repeatera w województwie zachodniopomorskim (firmware 1.16+):

```mccli
region def pl pl-zp
region save
region
```

Komenda `region def` tworzy hierarchię regionów. W tym przykładzie `pl-zp` zostaje podregionem `pl`.
Dla nowych regionów przekazywanie wiadomości (flood) jest automatycznie dozwolone. Komenda `region save` zapisuje konfigurację, a `region` wyświetla aktualne drzewo regionów. Oczekiwany wynik:

```mcregions
*^ F
 pl F
  pl-zp F
```

Litera `F` oznacza zezwolenie na przekazywanie wiadomości. Znak `^` wskazuje region oznaczony jako `home`.

Komenda `region def` nie usuwa istniejących regionów. Jeśli region już istnieje, może zmienić jego położenie w hierarchii. Przed zmianami sprawdź aktualną konfigurację poleceniem `region`.

### Włączanie i wyłączanie przekazywania

Przekazywanie dla wybranego regionu wyłączysz komendą `region denyf`:

```mccli
region denyf pl-zp
region save
```

Ponownie włączysz je komendą `region allowf`:

```mccli
region allowf pl-zp
region save
```

Na firmware starszym niż 1.15 po dodaniu regionu komendą `region put` trzeba też włączyć przekazywanie przez `region allowf`.


## Konfiguracja companiona (w aplikacji) {toc: Konfiguracja companiona}

### Import kanałów z pliku
1. W [generatorze regionów](/generator-regionow#kanaly-w-aplikacji) kliknij **Eksportuj kanały do pliku** pod tabelą i zaznacz potrzebne kanały.
2. Pobierz plik przyciskiem **Pobierz plik do importu**.
3. W aplikacji MeshCore przejdź do menu **Ustawienia → Importuj konfigurację** i wskaż pobrany plik. Przed importem możesz zapisać kopię zapasową przez **Eksportuj konfigurację**.

### Ręczne dodawanie kanałów
1. W aplikacji otwórz **Czaty → Dodaj kanał → Dołącz do kanału hashtagowego**.
2. W polu **Nazwa kanału** wpisz nazwę kanału hashtagowego z tabeli, np. `#zachodniopomorskie`. Jeśli w tabeli widnieje „Bez regionu”, przejdź do kroku 6.
3. Kliknij **Pokaż ustawienia zaawansowane**, a następnie pole **Zakres regionu**.
4. Jeśli regionu z tabeli nie ma na liście, kliknij **+** (**Dodaj region**), wpisz jego nazwę i zatwierdź ją przyciskiem **✓** w prawym górnym rogu.
5. Wybierz region z listy, np. `pl-zp` dla `#zachodniopomorskie`. Jeśli tabela podaje kilka opcji, wybierz tę, z której korzystają Twoi rozmówcy.
6. Kliknij **Dołącz do kanału**. Powtórz te kroki dla pozostałych kanałów.

Region istniejącego kanału zmienisz w jego menu pod trzema kropkami. Wybierz **Ustaw zakres regionu** lub **Wyczyść zakres**.

Rozmówcy muszą mieć tę samą nazwę kanału i ten sam region. Na przykład `#test` bez regionu i `#test` z regionem `wlkp` to osobne kanały.

### Wykrywanie regionów
W aplikacji MeshCore wybierz **Trzy kropki → Narzędzia → Wykryj regiony**.

Companion odpyta pobliskie repeatery w bezpośrednim zasięgu (0 hop) o regiony, które obsługą. Odpowiedzieć mogą też repeatery spoza listy kontaktów. Wykryte regiony możesz dodać z listy.
Funkcja bywa jednak zawodna - czasami nic nie wykrywa.

## Domyślny region {toc: Domyślny region}
Region można nadać także pakietom spoza kanałów - wiadomościom prywatnym (DM), advertom i żądaniom.

> [!WARNING]
> Pakiety z określonym regionem przekazują repeatery, których konfiguracja zezwala na przekazywanie tego regionu. Repeatery bez odpowiedniej konfiguracji mogą przerwać dalsze rozgłaszanie wiadomości.
> Ustaw domyślny region dopiero wtedy, gdy repeatery w Twojej okolicy mają już region `pl`. W przeciwnym razie Twoje wiadomości prywatne i adverty mogą nigdzie nie dotrzeć.

### Companion
Domyślny region ustawisz na głównym ekranie **Ustawień**. Obejmuje on wszystkie pakiety flood wysyłane przez companiona, a region ustawiony na kanale ma pierwszeństwo.
Jeśli go ustawiasz, wybierz region obejmujący zarówno Twój obszar, jak i obszary osób, z którymi piszesz - w Polsce `pl`. Zbyt mały region sprawi, że wiadomości prywatne i potwierdzenia (ACK) nie wyjdą poza jego granice.

> [!IMPORTANT]
> Domyślny region otrzymają także wiadomości na kanałach bez własnego regionu, w tym `Public` i `#emergency`. Jeśli mają pozostać bez regionu, nie ustawiaj domyślnego regionu na companionie.

### Repeater / room serwer
Sprawdzenie obecnego domyślnego regionu:

```mccli
region default
```

Ustawienie domyślnego regionu (zmiana zostaje automatycznie zapisana):

```mccli
region default pl
```

Wyczyszczenie domyślnego regionu:

```mccli
region default <null>
```

Domyślny region nie wpływa na przekazywane wiadomości innych użytkowników. Obejmuje adverty repeatera oraz adverty i posty room serwera.

Region odpowiedzi na żądania zależy od wersji firmware:
- **1.17.1 i nowsze:** żądanie z rozpoznanym regionem dostaje odpowiedź z tym samym regionem, a żądanie flood bez regionu - odpowiedź bez regionu. Jeśli regionu nie da się ustalić (np. jest nieznany urządzeniu), używany jest domyślny region, o ile został ustawiony.
- **1.15.0-1.17.0:** odpowiedź otrzymuje region żądania, a jeśli nie da się go ustalić, jest wysyłana bez regionu.

Ustawienie domyślnego regionu na `pl` nie jest obowiązkowe. Przed jego włączeniem upewnij się, że okoliczne repeatery obsługują ten region, a lokalna społeczność stosuje taki schemat.
