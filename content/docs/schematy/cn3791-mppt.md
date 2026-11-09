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
**MPPT** (Maximum Power Point Tracking) oznacza **śledzenie punktu mocy maksymalnej**. Układ steruje obciążeniem panelu słonecznego tak, aby uzyskać z niego możliwie dużą moc do ładowania akumulatora.

## Schemat podłączenia
<div class="docs-schematic">
	<a href="/pliki/schematy/obrazy/cn3791-mppt-solar-charger.jpg" data-lightbox aria-label="Powiększ schemat podłączenia modułu CN3791 MPPT">
		<img src="/pliki/schematy/obrazy/cn3791-mppt-solar-charger.jpg" alt="Schemat podłączenia modułu ładowarki solarnej CN3791 MPPT" width="1483" height="1061">
	</a>
</div>

## Wybór panelu
Moc panelu podaje się w **watach (W)**. Wyższe napięcie nie oznacza większej mocy - panel 12 V nie musi ładować szybciej niż 6 V. Napięcie panelu musi pasować do wariantu modułu.

## Podłączenie
- **Panel słoneczny:** do `SOLAR IN`, złącze `PH2.0-2P`. Dwa wejścia są połączone równolegle. Dobierz panel do wariantu modułu (6 V / 9 V / 12 V).
- **Akumulator:** do `BAT`, złącze `PH2.0-2P`. Obsługiwany jest Li-ion/LiPo **1S**: pojedyncze ogniwo lub kilka połączonych równolegle, o napięciu nominalnym **3,7 V**.
- **Zasilanie urządzenia:** z `BAT`, bez stabilizacji napięcia. Urządzenie musi obsługiwać zasilanie z akumulatora 1S.

> [!CAUTION]
> Zawsze sprawdź polaryzację złączy przed podłączeniem - odwrotne podpięcie akumulatora może uszkodzić moduł lub ogniwo.

## Materiał wideo
[Zobacz moduł ładowarki CN3791 MPPT na YouTube](https://www.youtube.com/shorts/2e9aoDYbNOk).
