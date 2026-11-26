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

## Dlaczego komputer nie widzi płytki do sflashowania?

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
