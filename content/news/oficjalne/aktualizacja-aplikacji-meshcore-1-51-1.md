---
title: MeshCore 1.51.1 - poprawki wysyłania wiadomości prywatnych
description: MeshCore 1.51.1 poprawia obsługę tras i ustawień wysyłania wiadomości prywatnych. Wersja na macOS otrzymała podpis cyfrowy i weryfikację Apple.
createdAt: 09.11.2026
tags: [Lista zmian, Aplikacja]
---

# Aktualizacja aplikacji MeshCore 1.51.1
Wersja **1.51.1** oficjalnej aplikacji MeshCore usuwa [błędy wysyłania wiadomości prywatnych zgłoszone w wersji 1.51.0](/aktualnosci/aplikacja/bledy-aplikacji-meshcore-1-51-0).

## Lista zmian
- Naprawiono resetowanie tras 3-bajtowych przy wysyłaniu wiadomości prywatnych. Aplikacja nie przełącza już takich kontaktów na rozgłaszanie (flood).
- Naprawiono błąd występujący przy wysyłaniu wiadomości do kontaktu bez znanej trasy, gdy liczba prób flood w ustawieniach wiadomości wynosiła **0**.
- Wersje na **macOS** mają teraz podpis cyfrowy i przeszły automatyczną kontrolę Apple (notaryzację).

## Pobierz aplikację
- [Pliki do pobrania wersji 1.51.1](https://files.liamcottle.net/MeshCore/v1.51.1/)
- [App Store](https://apps.apple.com/nz/app/meshcore/id6742354151)
- [Google Play](https://play.google.com/store/apps/details?id=com.liamcottle.meshcore.android)
