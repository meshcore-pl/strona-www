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

## Czy do korzystania z MeshCore potrzebuję pozwolenia radiowego lub internetu?

Nie. W Polsce na presecie **EU/UK Narrow** możesz nadawać bez pozwolenia radiowego, jeśli używasz urządzenia klasy 1 i przestrzegasz warunków dla pasma `869,40-869,65 MHz`. Maksymalna moc to `500 mW ERP`, z uwzględnieniem zysku anteny. W polskiej sieci MeshCore stosujemy limit czasu nadawania (duty cycle) do `10%`, czyli maksymalnie 6 minut nadawania na godzinę. Szczegóły znajdziesz w sekcji [Legalność i duty cycle](/dokumentacja/meshcore/wprowadzenie#legalnosc-i-duty-cycle).

Wiadomości są przesyłane drogą radiową, bez internetu i sieci komórkowej. Internet przyda się do pobrania aplikacji, wgrania oprogramowania przez [flasher](https://flasher.meshcore.io) czy przeglądania [mapy węzłów](https://mapa.meshcorepolska.org).

## Czy wiadomości są szyfrowane?

Tak. Kto może odczytać treść, zależy od tego, gdzie wysyłasz wiadomość.

- **Wiadomość prywatną** mogą odczytać tylko nadawca i odbiorca.
- **Na kanale prywatnym** wiadomości może odczytać każdy, kto ma klucz kanału.
- **Na room serwerze** historię wiadomości mogą przeczytać osoby z dostępem do serwera, np. te, które znają hasło.
- **Kanał `Public`** używa powszechnie znanego klucza, a klucz **kanału z hashtagiem** można wyliczyć z jego nazwy. Treść wiadomości na tych kanałach jest publiczna.

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

Ustaw na companionie [preset radiowy używany w Twojej okolicy](/dokumentacja/meshcore/aktualne-presety) i wyślij krótką wiadomość na kanale `#test`, np. samą literę `t`. Użyj [regionu przyjętego lokalnie dla tego kanału](/dokumentacja/meshcore/regionalizacja-wiadomosci), jeśli społeczność go ustaliła.

Zwróć uwagę na status widoczny pod wysłaną wiadomością:

- **Wysłano** - wiadomość została nadana, ale companion nie usłyszał żadnej jej retransmisji. [Dlaczego nikt mi nie odpowiada?](#dlaczego-nikt-mi-nie-odpowiada)
- **Odebrano: 1 repeater** - companion odebrał jedną retransmisję wysłanej wiadomości.
- **Odebrano: 3 repeatery** - companion usłyszał trzy retransmisje. Mogły pochodzić z różnych tras lub z kolejnych repeaterów na tej samej trasie.

[Odpowiedź od innego użytkownika](#co-oznacza-odpowiedz-np-kolobrzeg-4h) potwierdzi, że wiadomość do niego dotarła.

Brak odebranych retransmisji nie musi oznaczać całkowitego braku zasięgu. Powtórz test w kilku miejscach, np. przy oknie, na zewnątrz lub na wyższej kondygnacji budynku. Nawet niewielka zmiana położenia [anteny](/dokumentacja/meshcore/anteny) może poprawić łączność.

## Co oznacza odpowiedź np. "Kołobrzeg 4h"?

Taka odpowiedź oznacza, że Twoja wiadomość dotarła do odbiorcy w Kołobrzegu po czterech retransmisjach. Skrót `4h` pochodzi od angielskiego "4 hops" (cztery przeskoki). Litera `h` oznacza tutaj przeskoki, a nie godziny.

## Dlaczego nikt mi nie odpowiada?

Najpierw sprawdź, czy Twoja wiadomość jest retransmitowana. Wykonaj [test zasięgu](#jak-sprawdzic-czy-w-mojej-okolicy-jest-zasieg).

- **Jeśli nie widzisz retransmisji**, upewnij się, że [antena](/dokumentacja/meshcore/anteny) jest poprawnie podłączona, i porównaj konfigurację z [ustawieniami radiowymi używanymi w Polsce](#jakie-ustawienia-radiowe-wybrac-w-polsce). Warto też zajrzeć na [mapę węzłów](https://mapa.meshcorepolska.org), żeby sprawdzić, gdzie są najbliższe repeatery.
- **Jeśli problem dotyczy konkretnego kanału**, sprawdź, czy jego [ustawienie regionu](#czym-sa-regiony-i-czy-musze-je-ustawiac) zgadza się z konfiguracją używaną przez lokalną społeczność.

Sprawdź też w aplikacji **Ustawienia → Domyślny rozmiar hasha ścieżki**. W polskiej sieci używamy hashy 2- lub 3-bajtowych. Ustaw `2` lub `3` bajty zgodnie z ustaleniami lokalnej społeczności.

Jeśli widzisz retransmisję, daj rozmówcom trochę czasu. Możliwe, że akurat nikt nie zagląda na kanał.

## Czym różni się companion od repeatera i room serwera?

O roli urządzenia decyduje wgrane oprogramowanie, nie sama płytka.

- **Companion** to Twoje osobiste urządzenie do wysyłania i odbierania wiadomości przez aplikację. Domyślnie nie przekazuje wiadomości innych użytkowników.
- **Repeater** to przekaźnik, który rozszerza zasięg sieci: odbiera pakiety i nadaje je dalej. Nie przechowuje historii wiadomości.
- **Room serwer** działa jak lokalna tablica ogłoszeń: przechowuje historię wiadomości grupowych i udostępnia ją po podaniu hasła.

Na początek zwykle wystarczy sam companion. Więcej na ten temat dowiesz się z dokumentu [Role urządzeń](/dokumentacja/meshcore/wprowadzenie#role-urzadzen).

## Czy companion zapisuje wiadomości, gdy telefon jest rozłączony?

Tak. Włączony companion odbiera wiadomości bez telefonu i przechowuje je w pamięci. Gdy połączysz go z telefonem, aplikacja pobierze odebrane wiadomości i zsynchronizuje kontakty.

Po wyłączeniu lub restarcie companiona przepadają wiadomości, których aplikacja jeszcze nie pobrała. Gdy pamięć się zapełni, nowe wiadomości zastępują najstarsze z kanałów. Jeśli pamięć jest pełna i są w niej tylko wiadomości prywatne, companion nie zapisze żadnej nowej.

## Czy potrzebuję własnego repeatera?

Jeśli masz stabilną łączność z pobliskimi repeaterami, wystarczy companion. Sprawdź rozmieszczenie repeaterów na [mapie węzłów](https://mapa.meshcorepolska.org) i [przetestuj zasięg w swojej okolicy](#jak-sprawdzic-czy-w-mojej-okolicy-jest-zasieg).

Własny repeater warto uruchomić tam, gdzie poprawi lokalną łączność, rozszerzy zasięg lub połączy odseparowane części sieci. Znaczenie mają lokalizacja i wysokość montażu anteny. Na obszarach o dobrym pokryciu sieci dodatkowy repeater może niepotrzebnie obciążać kanał i zwiększać ryzyko kolizji pakietów.

## Czy repeater solarny przetrwa zimę?

Repeater solarny może pracować przez cały rok, jednak jego niezawodność zimą zależy przede wszystkim od zastosowanych ogniw, układu ładowania oraz bilansu energetycznego. Osobną kwestią jest szczelność obudowy i jej odporność na warunki atmosferyczne. Sama elektronika zazwyczaj dobrze znosi ujemne temperatury. Większym ograniczeniem są ogniwa Li-Ion 18650, których w większości przypadków nie należy ładować poniżej `0°C`. W niskich temperaturach wzrasta rezystancja wewnętrzna ogniw i spowalniają się procesy elektrochemiczne. Utrudnia to ładowanie, zwiększa spadki napięcia pod obciążeniem oraz ogranicza dostępną pojemność akumulatora. Ładowanie ogniw poniżej temperatury dopuszczalnej przez producenta może również prowadzić do ich trwałego uszkodzenia.

Dodatkowym ograniczeniem zimą jest krótszy dzień i mniejsze nasłonecznienie, co zmniejsza ilość energii dostarczanej przez panel słoneczny. Gotowe repeatery, takie jak SenseCAP Solar Node P1, wykorzystują niewielkie panele słoneczne o mocy `5 W`. W polskich warunkach zimowych taka moc często nie wystarcza do zapewnienia ciągłej pracy urządzenia. W większości przypadków odradzamy gotowe zestawy.

Warto zastosować kontroler ładowania z czujnikiem temperatury ogniw i automatyczną blokadą ładowania poza dopuszczalnym zakresem temperatur. Istotny jest również odpowiedni zapas pojemności akumulatora oraz mocy panelu fotowoltaicznego.

Zobacz też [Czym różnią się płytki z nRF52 i ESP32?](#czym-roznia-sie-plytki-z-nrf52-i-esp32)

## Jak nazwać swój repeater?

Skorzystaj z [generatora nazw](/generator-nazw). Wyszukasz w nim skrót swojej miejscowości, dodasz wyróżnik i skopiujesz gotową nazwę lub komendę `set name`.

Nazwa zaczyna się od **skrótu miejscowości** (np. `GDN`). Po spacji dodaj wyróżnik, np. nazwę dzielnicy, pobliskiej miejscowości, punktu orientacyjnego albo swój znak wywoławczy (jeśli go posiadasz). Dopiski `Repeater` i `RPT` możesz pominąć, gdyż są zbędne.

Jako skrótu użyj trzyznakowego kodu z międzynarodowego wykazu [UN/LOCODE](https://unlocode.unece.org/directory/locodes/?country=PL). Listę dla swojego regionu znajdziesz też na [stronie województwa](/wojewodztwa). Jeśli Twojej miejscowości nie ma w wykazie, wystarczy skrót jej nazwy, który każdy zrozumie.

| Przykładowa nazwa | Co oznacza |
| --- | --- |
| `GDN Oliwa` | Repeater w gdańskiej Oliwie. |
| `KRK SQ9XYZ` | Repeater w Krakowie oznaczony znakiem wywoławczym operatora. |
| `GDN Wrzeszcz N` | Repeater we Wrzeszczu z anteną skierowaną na północ. |
| `KOL Podczele SOL` | Repeater w kołobrzeskim Podczelu zamontowany na stałe i zasilany niezależnie od sieci energetycznej. |

Jeśli antena repeatera jest skierowana w konkretną stronę, możesz dopisać po wyróżniku skrót kierunku, np. `N` (północ).

Zadbaj, by nazwa była krótka. Jeśli repeater rozgłasza swoją lokalizację, w advercie mieszczą się 23 bajty nazwy, a bez lokalizacji 31. Polskie litery zajmują po 2 bajty. Komenda `set name` nie przyjmuje znaków `[ ] \ : , ? *`.

Dopisek `SOL` na końcu nazwy oznacza stałą instalację z panelem słonecznym i akumulatorem, która działa niezależnie od sieci energetycznej. Nie zastępuj go emoji, bo mogą się źle wyświetlać na ekranach niektórych urządzeń. Zobacz też: [oznaczenia repeaterów](/dokumentacja/meshcore/aktualne-presety#oznaczenia-repeaterow).

## Jakie ustawienia radiowe wybrać w Polsce?

Przyjętym standardem ogólnopolskiej sieci jest preset **EU/UK Narrow**. Parametry znajdziesz w sekcji [Dokładne ustawienia](/dokumentacja/meshcore/aktualne-presety#dokladne-ustawienia).

Część sieci na południu Polski korzysta z `SF6`. Urządzenia na `SF6` i `SF8` nie mogą się bezpośrednio komunikować. Na repeaterze zmień domyślny duty cycle z `50%` na `10%`. Szczegóły i zalecane komendy znajdziesz na stronie [Presety i konfiguracja radia](/dokumentacja/meshcore/aktualne-presety).

## Czym są regiony i czy muszę je ustawiać?

Nie, ale jest to ogromnie zalecane. Lepiej wcześniej niż później. Na kanałach regionalnych też toczą się rozmowy, szkoda je przegapić.

Region to etykieta, np. `pl` lub `pl-zp`. Wiadomość z taką etykietą przekazują tylko repeatery skonfigurowane do obsługi danego regionu. Dzięki temu lokalne rozmowy mogą pozostać w obrębie miasta lub województwa. Kanał `Public` powinien być bez regionu.

Więcej przeczytasz w dokumencie [Regionalizacja wiadomości](/dokumentacja/meshcore/regionalizacja-wiadomosci), a konfigurację przygotujesz w [generatorze regionów](/generator-regionow).

## Czym różnią się płytki z nRF52 i ESP32?

To dwie najpopularniejsze rodziny mikrokontrolerów w urządzeniach dla MeshCore: nRF52 od Nordic Semiconductor i ESP32 od Espressif. Żaden z nich nie ma wbudowanego radia LoRa, odpowiada za nie osobny układ, np. `SX1262`. Sam wybór mikrokontrolera nie decyduje więc o zasięgu.

| Cecha | nRF52 | ESP32 |
| --- | --- | --- |
| Przykładowe urządzenia | RAK4631, XIAO nRF52840, SenseCAP T1000-E | Heltec V4, XIAO ESP32-S3, LilyGO T-Beam, T-Deck |
| Wbudowana łączność | Bluetooth LE, bez Wi-Fi | Wi-Fi i Bluetooth LE |
| Połączenie companiona z aplikacją | Bluetooth, USB | Bluetooth, USB, Wi-Fi (zależnie od wariantu firmware) |
| Pobór energii | Niski | Wyraźnie wyższy, zwłaszcza przy włączonym Wi-Fi |
| Zasilanie bateryjne i solarne | Zalecany wybór, wystarczy mniejszy akumulator i panel | Możliwe, ale wymaga większego akumulatora i panelu |
| Wydajność i pamięć | Mniejsze, ale w pełni wystarczające dla MeshCore | Zwykle większe, przydatne np. przy rozbudowanych ekranach |
| Cena płytek | Zwykle wyższa | Zwykle niższa |
| Aktualizacja bez kabla (OTA) | Przez Bluetooth | Przez Wi-Fi |
| Typowe zastosowanie w MeshCore | Przenośne companiony, repeatery solarne | Tanie węzły ze stałym zasilaniem |

Jeśli najważniejszy jest długi czas pracy na baterii, wybierz nRF52. Jeśli zależy Ci na niskiej cenie albo chcesz mieć połączenie z companionem w całym domu przez Wi-Fi (BLE ma mniejszy zasięg), wybierz ESP32. Rzeczywisty pobór prądu zależy też od konkretnej płytki, ekranu, GPS, wersji oprogramowania i natężenia ruchu w sieci.

Poradniki aktualizacji OTA: [nRF52](/aktualnosci/poradnik/aktualizacje-ota-nrf) · [ESP32](/aktualnosci/poradnik/aktualizacje-ota-esp)

## Dlaczego mój komputer nie widzi płytki przy flashowaniu?

Najczęstszą przyczyną problemu jest kabel USB. Oba rodzaje kabli mogą wyglądać identycznie, ale różnić się przeznaczeniem:

- **Kabel tylko do ładowania** - zazwyczaj ma 2 żyły i zapewnia wyłącznie zasilanie. Płytka się uruchomi, ale komputer jej nie wykryje.
- **Kabel do transmisji danych** - ma co najmniej 4 żyły: dwie do zasilania i dwie do transmisji danych (`D+` i `D-`). Tylko taki kabel umożliwi wgranie oprogramowania przez USB.

Najlepiej weź sprawdzony kabel, przez który udało Ci się już przesłać pliki, np. z telefonu na komputer. Jeśli płytka nadal nie jest widoczna:

1. **Sprawdź port USB.** Podłącz płytkę bezpośrednio do komputera. Jeśli nadal jej nie wykrywa, spróbuj innego portu.
2. **Sprawdź sterownik.** Jeśli płytka korzysta z konwertera USB-UART, zainstaluj sterownik odpowiedni dla jej układu. [CP210x](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers) · [CH343/CH9102](https://www.wch-ic.com/downloads/CH343SER_EXE.html) · [CH340/CH341](https://www.wch-ic.com/downloads/CH341SER_EXE.html)
3. **Uruchom tryb wgrywania.** Sposób wejścia w ten tryb zależy od modelu płytki i bootloadera.
   - **ESP32:** na płytkach z przyciskami `BOOT` (lub `PRG`) i `RST` przytrzymaj `BOOT` lub `PRG`, naciśnij i puść `RST`, a następnie puść przytrzymany przycisk.
   - **nRF52 z bootloaderem UF2:** na wielu płytkach wystarczy szybko nacisnąć `RST` dwa razy, aby w systemie pojawił się dysk USB.
   - **SenseCAP T1000-E:** przytrzymaj przycisk urządzenia. Cały czas trzymając przycisk, podłącz kabel USB, odłącz go i od razu podłącz ponownie. [Instrukcja Seeed Studio](https://wiki.seeedstudio.com/sensecap_t1000_e_meshcore/)

Otwórz [flasher MeshCore](https://flasher.meshcore.io) w Chrome lub Edge. Jeśli system wykrywa port szeregowy, ale flasher nie może się z nim połączyć, zamknij programy, które mogą go używać.
