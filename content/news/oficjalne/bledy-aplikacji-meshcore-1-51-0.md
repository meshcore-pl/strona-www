---
title: Błędy w aplikacji MeshCore 1.51.0
description: MeshCore 1.51.0 resetuje 3-bajtowe trasy do flood przy wysyłaniu wiadomości prywatnych. Zerowa liczba prób flood blokuje wysyłkę do kontaktów bez znanej trasy.
createdAt: 09.11.2026
tags: [Aplikacja]
---

# ⚠️ Uwaga na błędy w aplikacji MeshCore 1.51.0
**Poprawka jest już dostępna.** Oba opisane poniżej błędy usuwa [aktualizacja do wersji 1.51.1](/aktualnosci/lista-zmian/aktualizacja-aplikacji-meshcore-1-51-1).

W [wersji 1.51.0](/aktualnosci/lista-zmian/aktualizacja-aplikacji-meshcore-1-51-0) występują dwa problemy z wysyłaniem wiadomości prywatnych (PW).

## Resetowanie tras 3-bajtowych
Przy wysyłaniu wiadomości do kontaktu z trasą **3-bajtową** aplikacja resetuje zapamiętaną trasę. Zamiast niej używa rozgłaszania (**flood**).

## Problem po ustawieniu liczby prób flood na 0
Jeśli w ustawieniach wiadomości (**Message Settings**) ustawisz liczbę prób flood na **0**, wysłanie wiadomości do kontaktu **bez znanej trasy** kończy się błędem.

## Czy te błędy mnie dotyczą?
Jeśli korzystasz z **tras 1- lub 2-bajtowych** i **nie masz ustawionej liczby prób flood na 0**, opisane problemy nie powinny Cię dotyczyć.
