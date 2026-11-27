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

## Czy do korzystania z MeshCore potrzebuję licencji lub internetu?

Nie. MeshCore w Polsce działa w paśmie bezlicencyjnym, więc nie potrzebujesz licencji krótkofalarskiej. Musisz jednak przestrzegać limitów: do `500 mW ERP` mocy i do `10%` duty cycle, czyli około 6 minut nadawania na godzinę. Pamiętaj, że na moc `ERP` wpływa również zysk anteny. Zapoznaj się z sekcją [Legalność i duty cycle](/dokumentacja/meshcore/wprowadzenie#legalnosc-i-duty-cycle).

Wiadomości są przesyłane drogą radiową, bez internetu i sieci komórkowej. Internet przyda się natomiast do pobrania aplikacji, wgrania oprogramowania przez flasher czy przeglądania mapy węzłów.

## Czy wiadomości są szyfrowane?

Tak. Kto może odczytać treść, zależy od tego, gdzie wysyłasz wiadomość.

- **Wiadomość prywatną** mogą odczytać tylko nadawca i odbiorca.
- **Na kanale prywatnym** wiadomości może odczytać każdy, kto ma klucz kanału.
- **Na room serwerze** historię wiadomości mogą przeczytać osoby z dostępem do serwera, np. te, które znają hasło.
- **Kanał `Public` i kanały z hashtagiem** traktuj jak publiczne.

> [!WARNING]
> Wiadomości z kanału `Public` i kanałów z hashtagiem mogą trafić do [publicznych analizatorów](/dokumentacja/meshcore/lista-analizatorow) w internecie. Jeśli się tam pojawią, każdy może je przeczytać, nawet bez własnego companiona.

## Jaki zasięg ma MeshCore?

Nie ma jednej wartości. Zasięg między dwoma urządzeniami zależy przede wszystkim od:

- **wysokości i miejsca montażu** - im lepsza widoczność między antenami, tym lepiej;
- **terenu i zabudowy** - budynki, wzniesienia i drzewa tłumią sygnał;
- **anteny** - liczy się jej jakość, dopasowanie do pasma (SWR) i charakterystyka, zobacz [Wszystko o antenach](/dokumentacja/meshcore/anteny);
- **zakłóceń i ustawień radiowych**.

Companion trzymany w mieszkaniu będzie miał zwykle znacznie mniejszy zasięg niż repeater umieszczony wysoko na zewnątrz. Dzięki repeaterom wiadomość może pokonać wiele przeskoków (hopów) i dotrzeć dużo dalej, niż sięga pojedyncze urządzenie.

## Jak sprawdzić, czy w mojej okolicy jest zasięg?

Najpewniejszym sposobem sprawdzenia zasięgu jest wykonanie testu łączności. Ustaw na companionie [właściwy preset radiowy](/dokumentacja/meshcore/aktualne-presety) i wyślij wiadomość na kanale `#test`.

Zwróć uwagę na status widoczny pod wysłaną wiadomością:
- **Wysłano** - wiadomość została nadana, ale companion nie usłyszał żadnej jej retransmisji.
- **Odebrano: 1 repeater** - companion odebrał retransmisję wysłanej wiadomości. Oznacza to, że masz łączność z pobliskim repeaterem.
- **Odebrano: 3 repeatery** lub więcej - companion usłyszał kilka retransmisji. To dobry znak, bo wiadomość ma więcej niż jedną drogę w głąb sieci.

Brak odebranych retransmisji nie musi oznaczać całkowitego braku zasięgu. Powtórz test w kilku miejscach, np. przy oknie, na zewnątrz lub na wyższej kondygnacji budynku. Nawet niewielka zmiana położenia [anteny](/dokumentacja/meshcore/anteny) może poprawić łączność.

## Dlaczego nikt mi nie odpowiada?

Najpierw sprawdź, czy Twoja wiadomość jest retransmitowana. Wykonaj [test zasięgu](#jak-sprawdzic-czy-w-mojej-okolicy-jest-zasieg).

- **Jeśli nie widzisz retransmisji**, upewnij się, że [antena](/dokumentacja/meshcore/anteny) jest poprawnie podłączona, i porównaj konfigurację z [ustawieniami radiowymi używanymi w Polsce](#jakie-ustawienia-radiowe-wybrac-w-polsce). Warto też zajrzeć na [mapę węzłów](https://mapa.meshcorepolska.org), żeby sprawdzić, gdzie są najbliższe repeatery.
- **Jeśli problem dotyczy konkretnego kanału**, sprawdź, czy jego [ustawienie regionu](#czym-sa-regiony-i-czy-musze-je-ustawiac) zgadza się z konfiguracją używaną przez lokalną społeczność.

Sprawdź też w aplikacji **Ustawienia → Domyślny rozmiar hasha ścieżki**. Ustaw `2` lub `3` bajty, zgodnie z ustaleniami lokalnej społeczności. Nie używaj `1`.

Jeśli widzisz retransmisję, daj rozmówcom trochę czasu. Możliwe, że akurat nikt nie zagląda na kanał.

## Czym różni się companion od repeatera i room serwera?

O roli urządzenia decyduje wgrane oprogramowanie, nie sama płytka.

- **Companion** to Twoje osobiste urządzenie do wysyłania i odbierania wiadomości przez aplikację. Domyślnie nie przekazuje wiadomości innych użytkowników.
- **Repeater** to przekaźnik, który rozszerza zasięg sieci: odbiera pakiety i nadaje je dalej. Nie przechowuje historii wiadomości.
- **Room serwer** działa jak lokalna tablica ogłoszeń: przechowuje historię wiadomości grupowych i udostępnia ją po podaniu hasła.

Na początek zwykle wystarczy sam companion. Więcej na ten temat dowiesz się z dokumentu [Role urządzeń](/dokumentacja/meshcore/wprowadzenie#role-urzadzen).

## Jakie ustawienia radiowe wybrać w Polsce?

Przyjętym standardem ogólnopolskiej sieci jest preset **EU/UK Narrow**:

| Parametr | Wartość |
| --- | --- |
| Częstotliwość | `869,618 MHz` |
| Szerokość pasma (BW) | `62,5 kHz` |
| Współczynnik rozpraszania (SF) | `8` |
| Współczynnik kodowania (CR) | `8` (można też użyć np. `5`, różne wartości CR są ze sobą kompatybilne) |

Część sieci na południu Polski korzysta z `SF6`. Urządzenia na `SF6` i `SF8` nie mogą się bezpośrednio komunikować. Na repeaterze ustaw też duty cycle na `10%`, ponieważ domyślna wartość przekracza [limit prawny](/dokumentacja/meshcore/wprowadzenie#legalnosc-i-duty-cycle). Szczegóły i zalecane komendy znajdziesz na stronie [Presety i konfiguracja radia](/dokumentacja/meshcore/aktualne-presety).

## Czym są regiony i czy muszę je ustawiać?

Nie, ale jest to ogromnie zalecane. Lepiej wcześniej niż później. Na kanałach regionalnych też toczą się rozmowy, szkoda je przegapić.

Region to etykieta, np. `pl` lub `pl-zp`. Wiadomość z taką etykietą przekazują tylko repeatery skonfigurowane do obsługi danego regionu. Dzięki temu lokalne rozmowy mogą pozostać w obrębie miasta lub województwa. Kanał `Public` powinien być bez regionu.

Więcej przeczytasz w dokumencie [Regionalizacja wiadomości](/dokumentacja/meshcore/regionalizacja-wiadomosci), a konfigurację przygotujesz w [generatorze regionów](/generator-regionow).

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

Jeśli najważniejszy jest długi czas pracy na baterii, wybierz nRF52. Jeśli zależy Ci na niskiej cenie albo chcesz mieć połączenie z companionem w całym domu przez Wi-Fi (BLE ma mniejszy zasięg), wybierz ESP32. Rzeczywisty pobór prądu zależy też od konkretnej płytki, ekranu, GPS, wersji oprogramowania i natężenia ruchu w sieci.

Poradniki aktualizacji OTA: [nRF52](/aktualnosci/poradnik/aktualizacje-ota-nrf) · [ESP32](/aktualnosci/poradnik/aktualizacje-ota-esp)

## Dlaczego mój komputer nie widzi płytki?

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
