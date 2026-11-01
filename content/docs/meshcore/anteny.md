---
title: Anteny do MeshCore - złącza i dobór
description: Dobór anten LoRa 868 MHz i Bluetooth do urządzeń MeshCore - anteny dla companionów i repeaterów, złącza SMA i RP-SMA, przewody oraz filtry BPF.
canonical: /dokumentacja/meshcore/anteny
createdAt: 13.07.2026
updatedAt: 1.11.2026
themeColor: '#dfddd6'
---

# Wszystko o antenach, złączach i przewodach do MeshCore {toc: Wszystko o antenach}
Zebraliśmy tu anteny, których używamy lub używaliśmy.
Podpowiadamy też, jak dobrać przewody i złącza, kiedy wybrać antenę kierunkową i w jakich sytuacjach warto sięgnąć po filtr. Szczególnie polecamy anteny od GIZONT-a.

> [!CAUTION]
> Nigdy nie nadawaj bez podłączonej anteny!
> Bez anteny energia z nadajnika odbija się od wyjścia antenowego i wraca do układu. Może to doprowadzić do jego trwałego uszkodzenia.
> Zanim włączysz lub zresetujesz urządzenie, upewnij się, że antena i przewód są prawidłowo podłączone.

> [!NOTE]
> Deklarowany zysk anteny (dBi) nie zawsze odpowiada rzeczywistości.
> Podane wartości pochodzą z opisów sprzedawców i nie zostały przez nas zweryfikowane.
> Mogą być zawyżone, szczególnie w przypadku tanich anten z AliExpress.
> Traktuj je orientacyjnie i nie kieruj się wyłącznie nimi przy zakupie. Pamiętaj też, że dobry wynik SWR nie oznacza automatycznie wysokiego zysku anteny.

> [!TIP]
> Zysk anteny (dBi) określa, jak mocno antena skupia sygnał w określonych kierunkach. Wyższy zysk może poprawić zasięg, ale nie oznacza lepszego odbioru w każdej sytuacji.

## Rodzaj złącza
Przed zakupem anteny i przewodu upewnij się, że ich złącza są zgodne z tym samym standardem (np. `SMA`, `RP-SMA` lub `N`) oraz wzajemnie dopasowane: złącze męskie (`Male`) musi łączyć się ze złączem żeńskim (`Female`).
Szczególnie uważaj na popularny w sprzęcie sieciowym standard `RP-SMA`, gdzie gwint wygląda identycznie jak w zwykłym `SMA`, ale styk środkowy jest odwrócony. `RP-SMA Male` ma w środku gniazdo, a `RP-SMA Female` ma wystający pin.
Przykładowo, jeśli antena ma złącze `RP-SMA Female` (z pinem w środku), nie podłączysz do niej zwykłego `SMA Male` ani drugiego `RP-SMA Female` - potrzebujesz przewodu zakończonego złączem `RP-SMA Male`.

<div class="docs-img-row">
	<div class="docs-img-row__item">
		<a href="/images/photos/sma-female-i-sma-male.jpg" data-lightbox aria-label="Powiększ zdjęcie złącza SMA Female i SMA Male">
			<img src="/images/photos/sma-female-i-sma-male.jpg" alt="Złącze SMA Female obok złącza SMA Male" width="760" height="380" class="docs-img-row__hero">
		</a>
	</div>
	<div class="docs-img-row__item">
		<a href="/images/photos/schemat-zlaczy-sma-i-rp-sma.jpg" data-lightbox aria-label="Powiększ schemat złączy SMA i RP-SMA">
			<img src="/images/photos/schemat-zlaczy-sma-i-rp-sma.jpg" alt="Schemat złączy SMA i RP-SMA - gniazdo i wtyk" width="340" height="340">
		</a>
		<p class="docs-img-caption">Źródło: <a href="https://download.kamami.pl/p562285-connection-diagram.jpg" target="_blank" rel="noopener nofollow">kamami.pl</a></p>
	</div>
</div>

## Pod companiony
### Elastyczna antena GIZONT (10 dBi)
Znakomita antena do companiona, pozwalająca uzyskać duży zasięg.
Jakiś czas temu GIZONT wprowadził na rynek model dostrojony do częstotliwości 869 MHz, podczas gdy poprzedni był przeznaczony na 868 MHz.
Pomiary współczynnika SWR wykonane za pomocą NanoVNA wykazały jednak, że różnica między nimi jest praktycznie niezauważalna.
Jeśli więc masz już antenę 868 MHz, nie ma potrzeby wymieniać jej na nowszą.

» [Link do AliExpress](https://pl.aliexpress.com/item/1005008862849597.html)

### Antena przegubowa (10 dBi)
Zwykle nie ma potrzeby kupowania wariantu z kablem. Przeczytaj informacje na samym dole tego dokumentu.

» [Link do AliExpress](https://pl.aliexpress.com/item/1005007308749444.html)

### Kompaktowa antena (3-5 dBi)
Niewielka antena. Jeśli jesteś bardzo blisko repeatera i używasz companiona tylko w domu, model o długości 5 cm lub 11 cm będzie w sam raz.

» [Link do AliExpress](https://pl.aliexpress.com/item/1005001386195377.html)


## Pod węzły (RPT i RS)

### Antena dookólna (8 dBi)
Idealna dla repeaterów. Uzyskaliśmy na niej łączność na odległość ponad 10 km (companion w samochodzie, antena nr 1 z listy powyżej).
Wybierz model o długości 55 cm. Napisz do sprzedawcy, że chcesz antenę białą, a nie czarną. Biały kolor lepiej odbija promienie słoneczne, dzięki czemu antena mniej się nagrzewa.
Istnieje również podobny model, którego nie testowaliśmy.

» [Link do AliExpress](https://pl.aliexpress.com/item/1005007463706065.html)  
» [Podobny model na AliExpress](https://pl.aliexpress.com/item/1005006109449349.html)

### Antena kierunkowa ATK-10 (12,8 dBi)
Znakomita antena kierunkowa. Pamiętaj, że ATK-10 promieniuje również częściowo na boki. Istnieje także ATK-20, która ma większy zysk, ale jest jeszcze większa.
Do anteny potrzebny będzie przewód koncentryczny (około 35-45 cm powinno wystarczyć) oraz odpowiedni wtyk N.

» [Link do Allegro](https://allegro.pl/oferta/antena-dipol-atk-10-800-980-mhz-12-8-dbi-lte900-do-licznikow-energii-7339950391)  
» [Przewód koncentryczny - Allegro](https://allegro.pl/oferta/przewod-antenowy-gsm-wlan-lte-50-om-tri-lan-240-1m-8383105296)  
» [Wtyk N - Allegro](https://allegro.pl/oferta/wtyk-n-zaciskany-na-przewod-rf-5-tri-lan-240-h-155-zloty-18298610874)

### Mała kierunkowa antena (7 dBi)
Mniejsza antena kierunkowa, przydatna, jeśli przeszkadzają Ci rozmiary ATK-10. Również promieniuje na boki, ale słabiej niż ATK-10. Jest od niej zdecydowanie mniej wydajna.

» [Link do AliExpress](https://pl.aliexpress.com/item/1005005869328733.html)

## Pod Bluetooth (BLE)
1. [AliExpress](https://pl.aliexpress.com/item/1005009684416243.html) - taka w zupełności wystarczy, można wybrać długość przewodu. Najlepiej przykleić ją od spodu puszki.
2. [AliExpress](https://pl.aliexpress.com/item/1005008294463974.html) - plastikowa, w większości przypadków powinna być OK.


## Kierunkowość anteny
Antena kierunkowa (np. Yagi) to nie wskaźnik laserowy.
Kierunkowość może kojarzyć się z wąską wiązką lasera, ale w praktyce bardziej przypomina światło latarki - szeroki stożek, który rozszerza się wraz z odległością.
Do tego antena promieniuje też trochę do tyłu.

### Co oznacza Yagi?
[Yagi](https://pl.wikipedia.org/wiki/Antena_Yagi) to typ anteny kierunkowej, opracowanej przez Hidetsugu Yagiego i Shintarō Udę z Uniwersytetu Tohoku w Sendai w Japonii.
Anteny tego typu skupiają sygnał w określonym kierunku, dzięki czemu zapewniają większy zasięg i lepszą jakość odbioru niż anteny dookólne.
Anteny Yagi są często stosowane w telewizji (DVB-T), GSM oraz radiokomunikacji.


## Przewód antenowy
Nigdy nie używaj przewodu `RF1.13` (ma czarną izolację). Więcej strat w TX niż pożytku. Zalecamy `RG178`.
Jeszcze lepszym przewodem jest `RG316`. Takie kable ze złączem `RF-1` nie są jednak standardowo dostępne u chińskich sprzedawców.
Jeśli napiszesz do sprzedawcy na AliExpress, powinien zrobić Ci taki kabel na zamówienie.
`RF1.13` może się sprawdzić głównie w companionach - zwykle w ciasnych, dobrze zoptymalizowanych obudowach, gdzie łatwiej poprowadzić tak cienki przewód.

![Porównanie przewodów RG178 i RF1.13](/images/photos/rg178-i-rf1.13.jpg)

> [!CAUTION]
> Pigtail RG316 nie będzie zbyt elastyczny. W niektórych przypadkach złącze `RF-1` może samo odpiąć się od płytki. W każdym razie i tak zalecamy `RG178` - w większości przypadków nie ma sensu kombinować. Mimo wszystko, jeśli wybierzesz ten lepszy, musisz być świadomy tego, co robisz.

## Filtry BPF
Używaj ich wyłącznie wtedy, gdy masz bardzo wysoki NF. Więcej informacji na ich temat znajdziesz [tutaj](https://meshcorepolska.org/dokumentacja/meshcore/noise-floor#noise-floor---czym-jest).
