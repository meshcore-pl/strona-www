---
title: Ładowarka solarna CN3791 MPPT - schemat modułu
description: Schemat modułu ładowarki solarnej CN3791 MPPT - podłączenie panelu słonecznego i akumulatora Li-ion/LiPo 3,7 V, typ złączy i materiał wideo.
canonical: /dokumentacja/schematy/cn3791-mppt
createdAt: 21.08.2026
updatedAt: 09.11.2026
themeColor: '#e0e7ed'
---

# CN3791 MPPT - ładowarka solarna {toc: CN3791 MPPT}
Popularny, tani moduł ładowania z algorytmem MPPT (Maximum Power Point Tracking) - często stosowany w repeaterach i room serwerach zasilanych panelem słonecznym i akumulatorem Li-ion/LiPo 3,7 V (patrz [Role urządzeń](https://meshcorepolska.org/dokumentacja/meshcore/wprowadzenie#repeater-rpt)).

## Co oznacza MPPT?
**MPPT** (Maximum Power Point Tracking) oznacza **śledzenie punktu mocy maksymalnej**. Pozwala lepiej wykorzystać moc panelu do ładowania akumulatora. Wybierz wersję pasującą do panelu (6 V / 9 V / 12 V).

## Schemat podłączenia
<div class="docs-schematic">
	<a href="/pliki/schematy/obrazy/cn3791-mppt-solar-charger.jpg" data-lightbox aria-label="Powiększ schemat podłączenia modułu CN3791 MPPT">
		<img src="/pliki/schematy/obrazy/cn3791-mppt-solar-charger.jpg" alt="Schemat podłączenia modułu ładowarki solarnej CN3791 MPPT" width="1483" height="1061">
	</a>
</div>

## Wybór panelu
Moc panelu podaje się w **watach (W)**. Wyższe napięcie nie oznacza większej mocy - panel 12 V nie musi ładować szybciej niż 6 V. Napięcie panelu musi pasować do wariantu modułu.

Sprawdź też **napięcie jałowe panelu (`Voc`)** - nie może przekraczać limitu wejścia modułu. Na mrozie napięcie panelu rośnie, więc uwzględnij to przy doborze.

## Podłączenie
- **Panel słoneczny:** do `SOLAR IN`, złącze `PH2.0-2P`. Dwa wejścia są połączone równolegle. Dobierz panel do wariantu modułu (6 V / 9 V / 12 V).
- **Akumulator:** do `BAT`, złącze `PH2.0-2P`. Obsługiwany jest Li-ion/LiPo **1S**: pojedyncze ogniwo lub kilka połączonych równolegle. **3,7 V** to napięcie nominalne, a po pełnym naładowaniu wynosi **4,2 V**.
- **Zasilanie urządzenia:** z `BAT`, bez stabilizacji napięcia. Urządzenie musi obsługiwać cały zakres napięcia akumulatora 1S, w tym **4,2 V**.

> [!CAUTION]
> Zawsze sprawdź polaryzację złączy przed podłączeniem - odwrotne podpięcie akumulatora może uszkodzić moduł lub ogniwo.

## Zabezpieczenie akumulatora
Sam CN3791 nie chroni ogniwa przed nadmiernym rozładowaniem ani zwarciem. Sprawdź, czy takie zabezpieczenie ma moduł, akumulator lub zasilane urządzenie.

> [!WARNING]
> Nie ładuj standardowych ogniw Li-ion/LiPo poniżej **0°C**, chyba że producent ogniwa na to pozwala. W instalacji zewnętrznej zadbaj o blokadę ładowania przy zbyt niskiej temperaturze - nie zakładaj, że moduł ją ma.

## Materiał wideo
[Zobacz moduł ładowarki CN3791 MPPT na YouTube](https://www.youtube.com/shorts/2e9aoDYbNOk).
