---
title: Presety EU/UK Narrow - zalecana konfiguracja radia
description: Zalecany preset EU/UK Narrow dla sieci MeshCore w Polsce - ustawienia radia, interwały advertów, podwójne potwierdzenia i oznaczenia repeaterów off-grid.
canonical: /dokumentacja/meshcore/aktualne-presety
createdAt: 25.07.2026
updatedAt: 5.11.2026
---

# Presety i konfiguracja radia w sieci MeshCore {toc: Presety i konfiguracja}
Konfigurujesz swojego companiona albo stawiasz dopiero repeater? Trzymaj się presetu **EU/UK Narrow** - to on jest dziś przyjętym standardem ogólnopolskiej sieci.

> [!IMPORTANT]
> Nie cała Polska korzysta z tych samych ustawień radiowych. [MeshCore Południe](https://meshcoresouth.pl) postawiło na własny preset (`SF6` zamiast `SF8`, pozostałe parametry zgodne z `EU/UK Narrow`).
> Takie rozwiązanie sprzyja szybszej wymianie pakietów w gęstej sieci miejskiej, ale odbywa się to kosztem zasięgu.
> Urządzenia pracujące na `SF8` nie mogą bezpośrednio komunikować się z repeaterami działającymi na `SF6` i odwrotnie. Brak kompatybilności utrudnia połączenie lokalnych węzłów we wspólną, ogólnopolską infrastrukturę.
>
> Węzły pracujące na `SF6` można znaleźć głównie w województwach śląskim i opolskim oraz w części Małopolski.
> Co ciekawe, spośród wszystkich krajów widocznych [na mapie](https://mapa.meshcorepolska.org/?lat=52.1537&lon=19.3250&zoom=7&types=2&freq=869&sf=6&cr=8,7,5,6&bw=62.5,250,125&updated=2025-03-01&added=2025-03-01&cluster=10&region=pl) Polska jest jedynym, w którym część węzłów działa na `SF6`.
> Możesz to sprawdzić samodzielnie, korzystając z filtrów parametrów radiowych.
>
> **Planujesz uruchomić własny repeater?** Wybierz `EU/UK Narrow` (`SF8`), jeśli chcesz pomóc w rozbudowie wspólnej, ogólnopolskiej sieci.
> Im więcej urządzeń działa na tych samych ustawieniach, tym łatwiej łączyć kolejne miejscowości i regiony w jedną, spójną infrastrukturę.

> [!NOTE]
> Jeśli zegar repeatera wyprzedza czas rzeczywisty, użyj `clkreboot`, a po restarcie zsynchronizuj go ponownie z poziomu aplikacji.

> [!TIP]
> Uruchamiasz w sieci bota? Nie używaj do tego kanałów `Public` ani `#test`. Utwórz dla niego osobny kanał (np. `#botwarszawa`), żeby nie zaśmiecał standardowych kanałów.


## Dokładne ustawienia

| Parametr                        | Wartość       |
|---------------------------------|---------------|
| Częstotliwość (frequency)       | `869,618 MHz` |
| Szerokość pasma (bandwidth, BW) | `62,5 kHz`    |
| Współczynnik rozpraszania (SF)  | `8`           |
| Współczynnik kodowania (CR)     | `8`           |

Zależy Ci na odrobinę większej prędkości transmisji? Zmień samo `CR` na `5`, reszta zostaje bez zmian.
Oba warianty są ze sobą kompatybilne - urządzenie na `CR8` bez problemu nawiąże kontakt z urządzeniem na `CR5` i odwrotnie.


## Oznaczenia repeaterów
Masz solidny repeater zamontowany na stałe, który działa niezależnie od sieci energetycznej dzięki panelowi słonecznemu i akumulatorowi?
Dodaj na końcu jego nazwy gwiazdkę (*) lub symbol słońca, np. `Mój Solarny Repeater ☀️`.
Dzięki temu każdy będzie mógł łatwo sprawdzić na mapie, które repeatery mogą działać również podczas lokalnej awarii zasilania.


## Higiena sieci

### Rozgłoszenia (adverty)
Im gęściej obstawiona okolica, tym łatwiej zapchać sieć samymi advertami. Dlatego dla Warszawy zalecane są dłuższe odstępy niż dla reszty kraju:

| Zagęszczenie węzłów | Advert 0-hop                        | Advert do wszystkich  |
|---------------------|-------------------------------------|-----------------------|
| Duże                | wyłączone                           | co najmniej 16 godzin |
| Małe                | co najmniej 4 godziny lub wyłączone | co najmniej 7 godzin  |

Czym są w ogóle adverty? Zobacz [Wprowadzenie > Podstawowe pojęcia](https://meshcorepolska.org/dokumentacja/meshcore/wprowadzenie#podstawowe-pojecia).

### Komendy CLI
Poniższe komendy (dla repeaterów, room serwerów i room-peaterów) pomagają utrzymać sieć w dobrej kondycji. Wymagane oprogramowanie: `1.14+`.

```mccli
set path.hash.mode 1          # dłuższe prefiksy (2 bajty) dla advertów - kosztem maks. 32 hopów flood (domyślnie 64)
set loop.detect minimal       # ograniczenie błądzenia pakietów w pętli
set advert.interval 0         # wyłącz interwał advertów 0-hop
set agc.reset.interval 480    # reset AGC co 8 min (480 s) - ogranicza dryft czułości
set dutycycle 10              # duty cycle 10% (firmware 1.15+)
```

Więcej o wielobajtowych skrótach trasy i wykrywaniu pętli przeczytasz we wpisie [Usprawnienia diagnostyki trasy](https://meshcorepolska.org/aktualnosci/oprogramowanie/usprawnienia-diagnostyki-trasy), o dutycycle w [Wprowadzenie > Legalność i duty cycle](https://meshcorepolska.org/dokumentacja/meshcore/wprowadzenie#legalnosc-i-duty-cycle), a o filtrowaniu ruchu między regionami w [Regionalizacja wiadomości](https://meshcorepolska.org/dokumentacja/meshcore/regionalizacja-wiadomosci).

#### Mniejsze miasta (np. Piła, Racibórz, Zamość)
```mccli
set multi.acks 1              # zwielokrotnione potwierdzenia
set flood.advert.interval 7   # interwał advertów do wszystkich
```

#### Duże miasta (np. Warszawa, Poznań, Łódź)
```mccli
set multi.acks 0              # wyłączone - zalecane w dużych sieciach (wartość domyślna)
set flood.advert.interval 17  # interwał advertów do wszystkich
```

### 2 repeatery obok siebie?
Tak, to możliwe, np. jeden na antenie kierunkowej, a drugi na dookólnej. Warto jednak zmienić kilka ustawień, żeby ograniczyć kolizje pakietów.

Ustaw `flood.advert.interval` zgodnie z zaleceniami z poprzedniej sekcji, zależnie od zagęszczenia i aktywności węzłów w okolicy.
Różne interwały nie gwarantują, że adverty obu repeaterów nie zostaną nadane jednocześnie.

> [!IMPORTANT]
> Parametry `txdelay` i `direct.txdelay` określają zakres losowego opóźnienia przed przekazaniem pakietu. Dopuszczalne wartości to **0-2**.
> Nie są to jednak sekundy! Faktyczny czas oczekiwania zależy od długości transmisji pakietu. Im wyższa wartość, tym większy zakres losowania.
> Domyślnie jest to **0.5** (`txdelay`) i **0.2** (`direct.txdelay`). Możesz przetestować większe współczynniki opóźnienia na jednym z repeaterów.
> Nawet przy różnych ustawieniach oba repeatery mogą nadać jednocześnie. Wyższe wartości mogą też wydłużyć przekazywanie wiadomości.

Poniższe wartości są przykładowe, a nie uniwersalnie zalecane dla dwóch repeaterów obok siebie. Sprawdź ich wpływ na kolizje i czas dostarczania wiadomości w swojej lokalizacji. Interwał advertów w przykładach odpowiada wariantowi dla małego zagęszczenia węzłów.

#### Repeater 1
```mccli
set flood.advert.interval 7
set txdelay 0.5           # domyślna górna granica
set direct.txdelay 0.2    # domyślna górna granica
```

#### Repeater 2
```mccli
set flood.advert.interval 8
set txdelay 1.5           # wyżej niż repeater 1, w granicach 0-2
set direct.txdelay 1      # wyżej niż repeater 1, w granicach 0-2
```
