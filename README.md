# meshcorepolska.org 🌍
Oficjalna witryna polskiej społeczności **MeshCore**, zbudowana w oparciu o **Node.js, Express.js i EJS**.

Serwis stanowi centrum informacji, poradników i materiałów dotyczących technologii MeshCore.
Jego celem jest wspieranie rozwoju zdecentralizowanej komunikacji radiowej, popularyzacja sieci mesh oraz integracja użytkowników i entuzjastów MeshCore w Polsce.

- 🌐 **Strona internetowa:** [meshcorepolska.org](https://meshcorepolska.org)
- 📖 **Dokumentacja:** [meshcorepolska.org/dokumentacja](https://meshcorepolska.org/dokumentacja)
- 📢 **Aktualności:** [meshcorepolska.org/aktualnosci](https://meshcorepolska.org/aktualnosci)
- 💬 **Społeczność na Discordzie:** [Dołącz teraz](https://meshcorepolska.org/discord)

## 🤝 Współtworzenie projektu
Projekt jest otwarty na wkład społeczności. Każda pomoc jest mile widziana, niezależnie od tego, czy dotyczy rozwoju strony, poprawiania błędów, rozbudowy funkcjonalności czy aktualizacji dokumentacji.

Jeśli chcesz pomóc w rozwoju projektu:
1. Utwórz fork repozytorium.
2. Wprowadź zmiany w swojej kopii projektu.
3. Przetestuj wprowadzone modyfikacje.
4. Wyślij **Pull Request** z opisem zmian.

Dokumentacja jest dostępna w katalogu [`content/docs`](content/docs). Możesz ją poprawiać, aktualizować i uzupełniać o nowe materiały.

Możesz również zgłaszać błędy i propozycje usprawnień w zakładce **Issues**.

## 🚀 Uruchomienie lokalne
Aby uruchomić stronę na własnym komputerze, potrzebujesz [Git](https://git-scm.com/install/), [Node.js](https://nodejs.org/en/download), [MongoDB](https://www.mongodb.com/try/download/community) oraz [Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/).

### 1. Sklonuj repozytorium
```bash
git clone https://github.com/meshcore-pl/strona-www meshcorepolska.org
```

### 2. Zainstaluj zależności
Przejdź do katalogu projektu i zainstaluj wymagane pakiety:
```bash
cd meshcorepolska.org
npm install
```

### 3. Przygotuj konfigurację
Utwórz lokalny plik konfiguracyjny na podstawie dostarczonego szablonu:
```bash
cp .env.example .env
```

Następnie otwórz plik `.env` i uzupełnij wymagane zmienne środowiskowe:

```bash
nano .env
```

**Uwaga:** Plik `.env` może zawierać poufne dane konfiguracyjne. Nie udostępniaj go publicznie ani nie dodawaj do repozytorium.

### 4. Uruchom aplikację
Po zakończeniu konfiguracji uruchom serwer:
```bash
node .
```

Aplikacja będzie dostępna pod adresem i portem określonym w konfiguracji projektu.
Aby zatrzymać serwer, naciśnij `Ctrl+C` w terminalu.

## 📁 Dokumentacja
Dokumentacja MeshCore jest rozwijana wspólnie przez społeczność i znajduje się w katalogu:
```text
content/docs/
```

Jej aktualna wersja jest publikowana na stronie [meshcorepolska.org/dokumentacja](https://meshcorepolska.org/dokumentacja).

Zachęcamy do zgłaszania poprawek, dodawania przykładów oraz tworzenia poradników, które ułatwią nowym użytkownikom rozpoczęcie pracy z MeshCore.

## 📄 Licencja
Kod źródłowy tej witryny jest udostępniany na licencji **PolyForm Noncommercial License 1.0.0**.
Licencja pozwala na korzystanie, kopiowanie, modyfikowanie i rozpowszechnianie kodu w zakresie dozwolonym jej warunkami, wyłącznie do zastosowań niekomercyjnych.
Wykorzystanie projektu do celów komercyjnych, w tym świadczenia płatnych usług lub sprzedaży rozwiązań opartych na jego kodzie, wymaga odrębnego uprawnienia od właścicieli praw autorskich.
Pełne warunki licencji: [PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0).
