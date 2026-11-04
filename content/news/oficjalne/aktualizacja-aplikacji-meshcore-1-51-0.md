---
title: Zmiany w aplikacji MeshCore 1.51.0 - szybkie wiadomości i mapy
description: MeshCore 1.51.0 dodaje szybkie wiadomości, nowe funkcje map, ustawienia ponawiania wysyłki i sterowanie brzęczykiem companiona. Sprawdź pełną listę zmian.
createdAt: 04.11.2026
tags: [Lista zmian, Aplikacja, Tłumaczenia]
---

# Szybkie wiadomości i nowe funkcje map w aplikacji MeshCore 1.51.0
Wersja **1.51.0** oficjalnej aplikacji MeshCore jest dostępna do pobrania pod linkiem [files.liamcottle.net/MeshCore/v1.51.0](https://files.liamcottle.net/MeshCore/v1.51.0/).

## Lista zmian
- Dodano szybkie wiadomości (gotowe szablony) w menu pola wpisywania wiadomości
- Dodano przycisk na ekranach map, który przenosi widok do bieżącej pozycji GPS telefonu
- Dodano opcję włączania i wyłączania powiadomień brzęczykiem companiona w ustawieniach powiadomień - wymaga firmware companiona w wersji 1.19.0 lub nowszej
- Dodano możliwość ustawienia liczby prób wysyłki wiadomości prywatnych trasą bezpośrednią (direct) i przez rozgłaszanie (flood)
- Dodano baner informujący, że odbiorca musi najpierw dodać Cię do kontaktów, aby można było wysyłać do niego wiadomości prywatne
- Dodano możliwość anulowania kolejnych prób wysyłki wiadomości prywatnej
- Dodano przycisk w szczegółach kontaktu pozwalający usunąć zapamiętany czas ostatniego advertu
- Dodano możliwość ustawienia własnej pozycji i skopiowania współrzędnych przez długie przytrzymanie punktu na mapie odkrywania węzłów
- Dodano znacznik pozycji własnego companiona na mapie odkrywania węzłów
- Dodano nowe okno dodawania kontaktów przez linki otwierane w aplikacji (deep linki)
- Wiadomości prywatne są teraz domyślnie wysyłane z maksymalnie 4 próbami direct i 4 próbami flood zamiast 4 prób direct i 1 próby flood
- Liczba przeskoków i rozmiar hasha trasy są teraz domyślnie wyświetlane pod wiadomościami kanałowymi
- Próba ponownego wysłania wiadomości bez połączenia z urządzeniem oznacza ją teraz jako niewysłaną
- Naprawiono błąd, przez który próba ponownego wysłania wiadomości bez połączenia z urządzeniem usuwała tę wiadomość
- Aplikacja wymaga teraz systemu macOS 12 lub nowszego

## Brakujące tłumaczenia
Nie udało nam się przygotować na czas wszystkich tłumaczeń do tego wydania. Część nowych opcji i komunikatów będzie więc tymczasowo wyświetlana po angielsku. Poniżej znajdziesz ich polskie odpowiedniki.

| Tekst w aplikacji                                                        | Sugerowane tłumaczenie                                                         |
|--------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| Buzzer Alerts                                                            | Alerty dźwiękowe                                                               |
| Show in the Quick Messages hot bar                                       | Pokaż na pasku szybkich wiadomości                                             |
| Quick message has been updated                                           | Zaktualizowano szybką wiadomość                                                |
| Quick message has been added                                             | Dodano szybką wiadomość                                                        |
| Are you sure you want to delete all?                                     | Czy na pewno chcesz usunąć wszystko?                                           |
| Delete All                                                               | Usuń wszystko                                                                  |
| Are you sure you want to delete this quick message?                      | Czy na pewno chcesz usunąć tę szybką wiadomość?                                |
| Delete Quick Message                                                     | Usuń szybką wiadomość                                                          |
| Edit Quick Message                                                       | Edytuj szybką wiadomość                                                        |
| Add Quick Message                                                        | Dodaj szybką wiadomość                                                         |
| Avoid typing the same message over and over. Use quick messages instead. | Nie wpisuj wielokrotnie tej samej wiadomości. Korzystaj z szybkich wiadomości. |
| No Quick Messages                                                        | Brak szybkich wiadomości                                                       |
| Quick Messages                                                           | Szybkie wiadomości                                                             |
| Location permissions are denied                                          | Odmówiono dostępu do lokalizacji                                               |
| Location services are disabled                                           | Usługi lokalizacji są wyłączone                                                |
| When enabled, your companion device is allowed to play buzzer alerts.    | Po włączeniu tej opcji companion może emitować sygnały dźwiękowe.              |
| Message is required                                                      | Wiadomość jest wymagana                                                        |
