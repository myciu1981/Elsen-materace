# SPECYFIKACJA FUNKCJONALNA — Elsen Materace

Data: 2026-08-02 · Wersja: 1.0
Dokumenty powiązane: [brief.md](brief.md) · [propozycje-wartosci.md](propozycje-wartosci.md)

**Stack docelowy:** statyczny HTML/CSS/JS · Cloudflare Pages · jedna funkcja serwerowa (Pages Function) do obsługi formularza · Resend jako nadawca poczty · Sveltia CMS · Cloudflare Web Analytics · Cloudflare Turnstile

---

## 0. ZMIANY WZGLĘDEM BRIEFU

| Zmiana | Powód | Konsekwencja |
|---|---|---|
| **Sekcja o poprawce twardości NIE wchodzi do v1** | Decyzja właściciela | Najmocniejsza wartość (50/50) nie jest komunikowana. Hero przebudowane — ciężar przejmują sprężyny kieszeniowe i polecenia. Wraca w v2 po zdefiniowaniu warunków. |
| **Mini-wywiad o twardości schodzi do P2** | Instrukcja „jak najmniej pól" | Dane do doboru twardości zbiera obsługa w rozmowie, nie formularz. |
| **Brak uploadu zdjęcia w formularzu** | Decyzja właściciela | Klient chcący pokazać łóżko kierowany na WhatsApp. |
| **Formularz przez Resend** | Decyzja właściciela | Strona przestaje być w 100% statyczna — dochodzi jeden endpoint serwerowy. Szczegóły w regule BR-12. |

### Hero po zmianie *(wersja robocza do akceptacji)*

> # Materace szyte ręcznie, z twardością dobraną do Ciebie
>
> Mała manufaktura pod Nowym Tomyślem. Sprężyny kieszeniowe ze stali odpornej na odkształcenia, pianki wysokiej gęstości, twardość ustalana z Twojej wagi i sposobu spania — nie z etykiety H2 czy H3.
>
> **[Zapytaj o wycenę]**  **[Napisz na WhatsApp]**
>
> *Bezpłatna wycena · odpowiadamy do 24 godzin · realizacja do 14 dni*

Bezpośrednio pod hero pasek zaufania: **„Prawie wszyscy nasi klienci przyszli z polecenia."**

---

## 1. ROLE UŻYTKOWNIKÓW

Strona nie ma kont użytkowników ani logowania dla odwiedzających. „Role" oznaczają tu **poziomy dostępu do systemu**, nie konta w aplikacji.

### R1 — Odwiedzający *(anonimowy, ~95% ruchu)*

| Może | Nie może |
|---|---|
| Przeglądać całą stronę bez logowania | Założyć konta — konta nie istnieją |
| Wysłać zapytanie o wycenę | Zobaczyć cen ani cennika |
| Napisać na WhatsApp | Zamówić lub zapłacić online |
| Zadzwonić (klikalny numer na telefonie) | Zobaczyć wcześniej wysłanych zapytań |
| Przeglądać galerię | Edytować czegokolwiek |
| Przeczytać politykę prywatności | |

### R2 — Obsługa zapytań *(żona właściciela)*

| Może | Nie może |
|---|---|
| Odbierać zapytania na `elsen.materace@gmail.com` | Edytować kodu strony |
| Odpowiadać klientom mailem i przez WhatsApp | Zmieniać ustawień domeny i hostingu |
| Prowadzić rozmowę doradczą i dobór twardości | |

> **Zobowiązanie wiążące tę rolę:** strona deklaruje odpowiedź **do 24 godzin**. Osoba pełniąca tę rolę musi o tym wiedzieć, zanim strona zostanie opublikowana.

### R3 — Redaktor treści *(żona właściciela; ta sama osoba co R2)*

| Może | Nie może |
|---|---|
| Dodawać i usuwać zdjęcia w galerii | Zmieniać układu i struktury strony |
| Edytować teksty w wyznaczonych polach | Edytować polityki prywatności i treści prawnych |
| Zmieniać dane kontaktowe | Publikować cen (pole nie istnieje w CMS) |
| Publikować zmiany od razu na żywo | Usunąć strony ani zepsuć nawigacji |

> **Zasada projektowa:** CMS udostępnia **wyłącznie pola bezpieczne**. Redaktor nie ma technicznej możliwości zepsucia strony — nie dlatego, że tego nie zrobi, tylko dlatego, że nie ma do czego sięgnąć.

### R4 — Administrator techniczny *(Ty)*

Pełny dostęp do repozytorium GitHub, konfiguracji Cloudflare Pages, kodu, wdrożeń i gałęzi `podglad`. Jedyna rola mogąca zmieniać strukturę strony, teksty prawne i konfigurację poczty.

### R5 — Właściciel biznesowy *(Hubert)*

Nie edytuje strony. **Jest właścicielem kont:** domena, Cloudflare i Resend rejestrowane na jego dane i jego kartę — administrator techniczny dostaje dostęp jako współpracownik. Zatwierdza treści przed publikacją i dostarcza dane blokujące (patrz sekcja 5).

### Macierz dostępów

| Zasób | R1 | R2 | R3 | R4 | R5 |
|---|:--:|:--:|:--:|:--:|:--:|
| Strona publiczna | ✓ | ✓ | ✓ | ✓ | ✓ |
| Skrzynka `elsen.materace@gmail.com` | — | ✓ | ✓ | — | ✓ |
| WhatsApp (nr Huberta) | — | ✓ | — | — | ✓ |
| CMS (galeria, teksty) | — | — | ✓ | ✓ | — |
| Repozytorium GitHub | — | — | — | ✓ | — |
| Cloudflare (Pages, DNS, Analytics) | — | — | — | ✓ | **właściciel** |
| Rejestrator domeny | — | — | — | ✓ | **właściciel** |
| Resend (klucz API) | — | — | — | ✓ | **właściciel** |

---

## 2. USER STORIES Z ACCEPTANCE CRITERIA

### US-01 · Zrozumienie oferty w pierwszych sekundach — **P0**

> Jako **osoba, której polecono Elsen**, chcę **w kilka sekund zobaczyć, czym jest ta firma i czym się różni**, żeby **wiedzieć, czy warto pisać zapytanie**.

- **GIVEN** odwiedzający wchodzi na stronę główną na telefonie
  **WHEN** strona się załaduje
  **THEN** bez przewijania widzi nagłówek, jedno zdanie wyjaśniające, dwa przyciski akcji i pasek „bezpłatna wycena · odpowiadamy do 24 godzin · realizacja do 14 dni"
- **GIVEN** odwiedzający na łączu 4G
  **WHEN** otwiera stronę
  **THEN** pierwsza treść pojawia się poniżej 2 sekund, a wynik PageSpeed mobile wynosi minimum 90
- **GIVEN** odwiedzający przewija stronę do końca
  **WHEN** przechodzi przez wszystkie sekcje
  **THEN** kolejność brzmi: hero → pasek zaufania → co nas wyróżnia → co jest w środku → jak to działa → galeria → zasięg dostawy → formularz → stopka
- **GIVEN** dowolne miejsce strony
  **WHEN** odwiedzający szuka ceny
  **THEN** nie znajduje żadnej kwoty ani widełek — zamiast tego widzi zachętę do bezpłatnej wyceny

---

### US-02 · Wysłanie zapytania o wycenę — **P0** ⭐ *funkcja krytyczna*

> Jako **zainteresowany klient**, chcę **wysłać zapytanie bez dzwonienia i bez wypełniania długiego formularza**, żeby **dostać wycenę przy minimalnym wysiłku**.

**Pola formularza:**

| Pole | Typ | Wymagane |
|---|---|---|
| Szerokość (cm) | liczba | ✓ |
| Długość (cm) | liczba | ✓ |
| Telefon | tekst | ✓ *(lub e-mail)* |
| E-mail | e-mail | ✓ *(lub telefon)* |
| Uwagi | tekst wielolinijkowy | — |
| Zgoda na przetwarzanie danych | checkbox | ✓ |

- **GIVEN** poprawnie wypełniony formularz
  **WHEN** odwiedzający klika „Wyślij zapytanie"
  **THEN** przycisk przechodzi w stan ładowania, a po sukcesie użytkownik trafia na stronę `/dziekujemy` z informacją o odpowiedzi w ciągu 24 godzin i alternatywnym kontaktem
- **GIVEN** formularz bez telefonu **i** bez e-maila
  **WHEN** użytkownik próbuje wysłać
  **THEN** wysyłka jest zablokowana, a pod oboma polami pojawia się komunikat „Podaj telefon albo e-mail — wystarczy jedno"
- **GIVEN** niezaznaczona zgoda RODO
  **WHEN** użytkownik próbuje wysłać
  **THEN** wysyłka zablokowana, checkbox podświetlony, komunikat „Zgoda jest niezbędna, żebyśmy mogli odpowiedzieć"
- **GIVEN** wymiary poza zakresem 50–250 cm
  **WHEN** użytkownik opuszcza pole
  **THEN** komunikat „Sprawdź wymiar — podaj w centymetrach", ale wysyłka **nie jest blokowana** *(nietypowe wymiary istnieją)*
- **GIVEN** awaria wysyłki poczty
  **WHEN** żądanie zwraca błąd
  **THEN** formularz pozostaje wypełniony, pojawia się komunikat „Nie udało się wysłać — napisz na WhatsApp albo zadzwoń" z aktywnymi przyciskami kontaktu
- **GIVEN** wysłane zapytanie
  **WHEN** użytkownik natychmiast klika „Wyślij" ponownie
  **THEN** drugie wysłanie jest zablokowane (patrz BR-09)
- **GIVEN** bot wypełniający formularz
  **WHEN** próbuje wysłać
  **THEN** Turnstile lub pole-pułapka odrzuca żądanie, a użytkownik-człowiek nie widzi żadnej zagadki

---

### US-03 · Potwierdzenie dla klienta — **P0**

> Jako **osoba, która wysłała zapytanie**, chcę **dostać maila potwierdzającego**, żeby **wiedzieć, że nie wpadło w próżnię**.

- **GIVEN** zapytanie z podanym adresem e-mail
  **WHEN** wysyłka się powiedzie
  **THEN** klient otrzymuje w ciągu 60 sekund maila z podziękowaniem, podsumowaniem podanych wymiarów, informacją o odpowiedzi do 24 godzin oraz numerem telefonu i WhatsApp
- **GIVEN** zapytanie **bez** adresu e-mail (sam telefon)
  **WHEN** wysyłka się powiedzie
  **THEN** autoresponder nie jest wysyłany, a proces kończy się sukcesem bez błędu
- **GIVEN** niezweryfikowana domena w Resend
  **WHEN** system próbuje wysłać autoresponder
  **THEN** funkcja **nie blokuje** zapytania do firmy — powiadomienie wewnętrzne ma pierwszeństwo (patrz BR-13)

---

### US-04 · Powiadomienie firmy o zapytaniu — **P0**

> Jako **osoba obsługująca zapytania**, chcę **dostać czytelnego maila z każdym zapytaniem**, żeby **odpowiedzieć w obiecanym czasie**.

- **GIVEN** poprawnie wysłane zapytanie
  **WHEN** funkcja je przetworzy
  **THEN** na `elsen.materace@gmail.com` przychodzi mail w ciągu 60 sekund, z tematem `Zapytanie o wycenę — [szer.×dł.] cm`
- **GIVEN** otrzymany mail
  **WHEN** obsługa otwiera go na telefonie
  **THEN** wszystkie pola są czytelne bez przewijania w bok, a telefon i e-mail klienta są klikalne
- **GIVEN** otrzymany mail
  **WHEN** obsługa klika „Odpowiedz"
  **THEN** adresatem jest klient, nie system *(reply-to ustawione na dane klienta)*

---

### US-05 · Kontakt przez WhatsApp — **P0**

> Jako **osoba, która nie chce dzwonić ani wypełniać formularza**, chcę **napisać jednym kliknięciem**, żeby **szybko zadać pytanie**.

- **GIVEN** odwiedzający na telefonie
  **WHEN** klika przycisk WhatsApp
  **THEN** otwiera się aplikacja WhatsApp z numerem właściciela i **pustym polem wiadomości**
- **GIVEN** odwiedzający na komputerze
  **WHEN** klika przycisk WhatsApp
  **THEN** otwiera się WhatsApp Web w nowej karcie; jeśli użytkownik ma zainstalowaną aplikację desktopową, system może przejąć odnośnik
- **GIVEN** odwiedzający na telefonie
  **WHEN** przewija stronę w dół
  **THEN** przycisk WhatsApp pozostaje przyklejony do dolnej krawędzi i nie zasłania pól formularza

---

### US-06 · Kontakt telefoniczny — **P0**

> Jako **odwiedzający wolący rozmowę**, chcę **zadzwonić jednym kliknięciem**, żeby **nie przepisywać numeru**.

- **GIVEN** odwiedzający na telefonie
  **WHEN** klika numer
  **THEN** otwiera się dialer z wpisanym numerem
- **GIVEN** odwiedzający na komputerze
  **WHEN** widzi numer
  **THEN** numer jest wyświetlony jako tekst możliwy do zaznaczenia, bez próby wykonania połączenia

---

### US-07 · Zrozumienie, co jest w środku materaca — **P0**

> Jako **osoba sparzona na tanim materacu**, chcę **wiedzieć, z czego to jest zrobione**, żeby **ocenić, czy to nie kolejna ściema**.

- **GIVEN** sekcja „co jest w środku"
  **WHEN** odwiedzający ją czyta
  **THEN** widzi trzy konkrety: sprężyny kieszeniowe ze stali odpornej na odkształcenia, pianki wysokiej gęstości dobierane do wagi, pokrowiec z tkaniny materacowej z atestem higienicznym
- **GIVEN** ta sama sekcja
  **WHEN** odwiedzający szuka nazw certyfikatów
  **THEN** **nie znajduje żadnej nazwy własnej** — do czasu potwierdzenia dokumentem obowiązuje sformułowanie „tkanina z atestem higienicznym" (patrz BR-17)
- **GIVEN** ta sama sekcja
  **WHEN** odwiedzający szuka informacji o pokrowcu
  **THEN** nie znajduje wzmianki o zdejmowaniu ani praniu — temat nie jest poruszany (patrz BR-18)

---

### US-08 · Zrozumienie procesu zamówienia — **P0**

> Jako **osoba bojąca się zamawiać u nieznanego producenta**, chcę **wiedzieć, co się stanie po wysłaniu zapytania**, żeby **nie bać się pierwszego kroku**.

- **GIVEN** sekcja „jak to działa"
  **WHEN** odwiedzający ją czyta
  **THEN** widzi cztery kroki: (1) piszesz lub dzwonisz, (2) rozmawiamy i dobieramy twardość, (3) wykonujemy do 14 dni, (4) dowozimy własnym transportem
- **GIVEN** krok pierwszy
  **WHEN** odwiedzający go czyta
  **THEN** jest tam wyraźnie napisane, że wycena jest bezpłatna i do niczego nie zobowiązuje

---

### US-09 · Weryfikacja wiarygodności — **P0**

> Jako **osoba nieznająca firmy**, chcę **zobaczyć dowody, że to prawdziwa manufaktura**, żeby **zaufać na tyle, by napisać**.

- **GIVEN** sekcja zaufania
  **WHEN** odwiedzający ją czyta
  **THEN** widzi: zdanie o poleceniach, informację o mistrzu tapicerstwa z ponad 20-letnim doświadczeniem oraz cytat klienta
- **GIVEN** dowolne miejsce strony
  **WHEN** odwiedzający szuka nazwiska lub imienia właściciela
  **THEN** **nie znajduje go nigdzie** — ani w tekście, ani w kodzie źródłowym, ani w metadanych zdjęć (patrz BR-19)
- **GIVEN** sekcja zaufania
  **WHEN** odwiedzający szuka liczby wykonanych materacy
  **THEN** nie znajduje jej — obowiązuje sformułowanie jakościowe „prawie wszyscy nasi klienci przyszli z polecenia"

---

### US-10 · Zgodność z RODO — **P0**

> Jako **odwiedzający zostawiający dane**, chcę **wiedzieć, kto je dostaje i co z nimi robi**, żeby **świadomie wyrazić zgodę**.

- **GIVEN** formularz
  **WHEN** odwiedzający go widzi
  **THEN** przy checkboxie zgody znajduje się klauzula informacyjna: administrator danych, cel, podstawa prawna, okres przechowywania i prawa osoby, wraz z odnośnikiem do polityki prywatności
- **GIVEN** strona `/polityka-prywatnosci`
  **WHEN** odwiedzający ją otwiera
  **THEN** znajduje pełne dane administratora, w tym nazwę firmy, NIP i adres
- **GIVEN** cała witryna
  **WHEN** odwiedzający ją przegląda
  **THEN** **nie pojawia się żaden baner cookies** — Cloudflare Web Analytics nie używa ciasteczek ani nie profiluje użytkowników (patrz BR-15)

> ⚠️ **BLOKADA:** ta historia nie może zostać ukończona bez pełnych danych firmy (nazwa, NIP, adres).

---

### US-11 · Galeria realizacji — **P1**

> Jako **odwiedzający**, chcę **zobaczyć prawdziwe zdjęcia**, żeby **przekonać się, że produkt istnieje**.

- **GIVEN** galeria zawierająca zdjęcia
  **WHEN** odwiedzający klika miniaturę
  **THEN** otwiera się powiększenie z możliwością przechodzenia między zdjęciami i zamknięcia klawiszem Esc lub gestem
- **GIVEN** galeria **bez** zdjęć
  **WHEN** strona się renderuje
  **THEN** cała sekcja **nie wyświetla się w ogóle** — zamiast pustej ramki lub napisu „wkrótce" (patrz BR-06)
- **GIVEN** zdjęcie dodane przez redaktora
  **WHEN** jest publikowane
  **THEN** zostaje automatycznie przeskalowane i skompresowane, a na stronie ładuje się dopiero przy dojściu do niego (lazy loading)

---

### US-12 · Samodzielna edycja treści — **P1**

> Jako **redaktor treści bez wiedzy technicznej**, chcę **dodać zdjęcie i poprawić tekst bez proszenia o pomoc**, żeby **strona nie zestarzała się w miesiąc**.

- **GIVEN** redaktor wchodzi na `/admin`
  **WHEN** loguje się
  **THEN** logowanie zajmuje **jedno kliknięcie**, bez wpisywania i pamiętania hasła do strony
- **GIVEN** zalogowany redaktor
  **WHEN** dodaje zdjęcie do galerii i zapisuje
  **THEN** zmiana jest widoczna na żywej stronie w ciągu 3 minut, bez udziału administratora
- **GIVEN** zalogowany redaktor
  **WHEN** przegląda dostępne opcje
  **THEN** widzi wyłącznie: galerię, teksty sekcji i dane kontaktowe — nie ma dostępu do układu, kodu, cen ani treści prawnych
- **GIVEN** redaktor przesyła zdjęcie większe niż 5 MB
  **WHEN** próbuje zapisać
  **THEN** dostaje czytelny komunikat po polsku, a nie błąd techniczny
- **GIVEN** galeria zawiera już 30 zdjęć
  **WHEN** redaktor dodaje kolejne
  **THEN** system informuje o osiągnięciu limitu i prosi o usunięcie któregoś (patrz BR-07)

> **Uczciwe zastrzeżenie:** wszystkie CMS-y dla stron statycznych logują się kontem GitHub. „Jedno kliknięcie" dotyczy **codziennego użycia** — jednorazowo trzeba założyć redaktorowi konto GitHub i przyjąć zaproszenie do repozytorium. Robi to administrator techniczny raz, wspólnie z redaktorem. Później to już tylko „Zaloguj przez GitHub".

---

### US-13 · Zasięg dostawy — **P1**

> Jako **odwiedzający spoza Nowego Tomyśla**, chcę **wiedzieć, czy dowieziecie do mnie**, żeby **nie tracić czasu na zapytanie bez sensu**.

- **GIVEN** sekcja zasięgu
  **WHEN** odwiedzający ją widzi
  **THEN** widzi prostą grafikę z okręgiem 100 km wokół Nowego Tomyśla, wypisanymi miastami w zasięgu oraz informacją o wysyłce kurierskiej do reszty Polski
- **GIVEN** ta sama sekcja
  **WHEN** odwiedzający szuka informacji o wnoszeniu do mieszkania
  **THEN** nie znajduje jej — temat nie jest poruszany (patrz BR-18)

---

### US-14 · Widoczność w Google — **P1**

> Jako **właściciel**, chcę **żeby strona była znajdowana lokalnie**, żeby **przychodzili też klienci spoza poleceń**.

- **GIVEN** kod strony
  **WHEN** analizuje go robot Google
  **THEN** znajduje dane strukturalne `LocalBusiness` z nazwą, obszarem działania, telefonem i godzinami kontaktu
- **GIVEN** strona udostępniana na Facebooku lub WhatsAppie
  **WHEN** ktoś wkleja odnośnik
  **THEN** pojawia się miniatura, tytuł i opis (Open Graph)
- **GIVEN** opublikowana witryna
  **WHEN** administrator sprawdza konfigurację
  **THEN** istnieją `sitemap.xml` i `robots.txt`, a strona jest zgłoszona w Google Search Console

---

### US-15 · Podgląd przed publikacją — **P0** *(proces)*

> Jako **administrator techniczny**, chcę **pokazać wersję roboczą właścicielowi**, żeby **zebrać uwagi przed uruchomieniem domeny**.

- **GIVEN** zmiany wypchnięte na gałąź `podglad`
  **WHEN** Cloudflare zakończy budowanie
  **THEN** dostępny jest stabilny adres podglądu, ten sam po każdym wypchnięciu
- **GIVEN** strona podglądowa
  **WHEN** trafia na nią robot wyszukiwarki
  **THEN** jest blokowana nagłówkiem `noindex` i nie trafia do wyników wyszukiwania
- **GIVEN** strona podglądowa
  **WHEN** ktoś wysyła z niej testowy formularz
  **THEN** mail trafia na adres testowy administratora, nie na skrzynkę firmową (patrz BR-14)

---

### US-16 · Mini-wywiad o twardości — **P2** *(odłożone)*

> Jako **klient**, chcę **odpowiedzieć na trzy pytania o sen**, żeby **dostać trafniejszą propozycję**.

Trzy opcjonalne pola: waga, pozycja spania, co przeszkadza w obecnym materacu.
**Odłożone świadomie** — kolidowałoby z decyzją „jak najmniej pól". Do rozważenia po pierwszych 20 zapytaniach, gdy będzie wiadomo, ile czasu obsługa traci na dopytywanie o te same rzeczy.

---

### Zestawienie priorytetów

| Priorytet | Historie |
|---|---|
| **P0** — bez tego nie publikujemy | US-01, US-02, US-03, US-04, US-05, US-06, US-07, US-08, US-09, US-10, US-15 |
| **P1** — powinno być na starcie | US-11, US-12, US-13, US-14 |
| **P2** — po v1 | US-16, sekcja o poprawce twardości, teksty poradnikowe |

---

## 3. USER FLOWS

### Flow A — „Polecony wysyła zapytanie" *(ścieżka główna, ~70% ruchu)*

1. Znajomy podaje nazwę firmy. Użytkownik wpisuje „Elsen materace" w Google **albo** klika odnośnik przesłany na WhatsAppie.
2. Ląduje na stronie głównej, na telefonie. Widzi hero: nagłówek, zdanie wyjaśniające, dwa przyciski, pasek z terminami.
3. Przewija. Pasek zaufania: **„Prawie wszyscy nasi klienci przyszli z polecenia"** — potwierdza to, co usłyszał od znajomego.
4. Czyta „co nas wyróżnia" i „co jest w środku". Zatrzymuje się na sprężynach kieszeniowych i piankach.
5. Czyta „jak to działa" — cztery kroki. Rejestruje: *wycena jest darmowa i do niczego nie zobowiązuje*.
6. Przewija do formularza. Widzi cztery pola i jeden checkbox — ocenia, że to kwestia minuty.
7. Wpisuje wymiary swojego łóżka i numer telefonu. Zaznacza zgodę.
8. Klika **„Wyślij zapytanie"**. Przycisk przechodzi w stan ładowania.
9. Trafia na `/dziekujemy`: *„Dziękujemy. Odezwiemy się w ciągu 24 godzin."* Poniżej WhatsApp i telefon, gdyby chciał szybciej.
10. Jeśli podał e-mail — w ciągu minuty dostaje potwierdzenie z podsumowaniem wymiarów.
11. **Równolegle:** obsługa dostaje maila z tematem `Zapytanie o wycenę — 160×200 cm` i klikalnym numerem klienta.

**Punkt krytyczny:** krok 6. Jeśli formularz wygląda na długi, użytkownik odpada. Dlatego cztery pola, a nie osiem.

---

### Flow B — „Wolę napisać niż wypełniać" *(~20% ruchu)*

1. Użytkownik wchodzi na stronę, przegląda pobieżnie.
2. Ma konkretne pytanie („czy zrobicie 90×190 twardy?") i nie chce formularza.
3. Klika przyklejony przycisk **WhatsApp** na dole ekranu.
4. Otwiera się WhatsApp z numerem właściciela i **pustym polem** — pisze własnymi słowami.
5. Może od razu dołączyć zdjęcie łóżka, czego formularz nie oferuje.
6. Obsługa odpowiada w ciągu kilku godzin, najpóźniej do 24.

**Uwaga:** ta ścieżka **nie jest mierzalna** w analityce poza kliknięciem. Liczba realnych rozmów znana jest tylko obsłudze — o czym trzeba pamiętać przy ocenie kryterium sukcesu „5 zapytań miesięcznie".

---

### Flow C — „Redaktor dodaje zdjęcia z warsztatu" *(ścieżka wewnętrzna)*

1. Właściciel robi telefonem 6 zdjęć: rolki pianki, sprężyny, szycie, gotowy materac.
2. Przesyła je redaktorowi (żonie) na WhatsAppie.
3. Redaktor otwiera `/admin` na komputerze i klika **„Zaloguj przez GitHub"** — jedno kliknięcie, sesja jest zapamiętana.
4. Wybiera sekcję **Galeria**, klika **Dodaj zdjęcie**, wskazuje pliki z dysku.
5. Do każdego wpisuje krótki opis (trafia do atrybutu `alt` — istotne dla Google i czytników ekranu).
6. Klika **Zapisz**. CMS zapisuje zmianę w repozytorium.
7. Cloudflare przebudowuje stronę. Po około 2 minutach zdjęcia są widoczne publicznie.
8. Redaktor odświeża stronę i sprawdza efekt.

**Punkt krytyczny:** krok 3 przy pierwszym użyciu. Konto GitHub zakłada administrator **wspólnie z redaktorem, przy jednym spotkaniu** — inaczej ta ścieżka nigdy nie zostanie przejściu do końca.

---

## 4. REGUŁY BIZNESOWE

### Formularz i dane

| ID | Reguła |
|---|---|
| **BR-01** | Jeśli nie podano ani telefonu, ani e-maila — formularz nie zostaje wysłany. |
| **BR-02** | Jeśli podano tylko jedno z pól kontaktowych — to wystarczy, formularz przechodzi. |
| **BR-03** | Jeśli nie zaznaczono zgody na przetwarzanie danych — formularz nie zostaje wysłany. |
| **BR-04** | Jeśli wymiar wykracza poza 50–250 cm — wyświetlamy ostrzeżenie, ale **nie blokujemy** wysyłki. |
| **BR-05** | Jeśli zapytanie zawiera adres e-mail — wysyłamy autoresponder. W przeciwnym razie pomijamy go bez zgłaszania błędu. |
| **BR-09** | Jeśli z tej samej przeglądarki wysłano zapytanie w ciągu ostatnich 60 sekund — kolejne wysłanie jest blokowane z komunikatem „Zapytanie zostało już wysłane". |
| **BR-10** | Jeśli formularz wypełni bot (Turnstile lub pole-pułapka) — żądanie jest odrzucane po cichu, bez informacji zwrotnej dla nadawcy. |
| **BR-11** | Jeśli treść zapytania przekracza 2000 znaków — pole jest ucinane przy wprowadzaniu, z widocznym licznikiem. |

### Poczta i dostępność usługi

| ID | Reguła |
|---|---|
| **BR-12** | Wysyłką zajmuje się jedna funkcja serwerowa Cloudflare Pages wywołująca Resend. Klucz API przechowywany wyłącznie jako zmienna środowiskowa — nigdy w repozytorium ani w kodzie strony. |
| **BR-13** | Jeśli powiadomienie do firmy zostanie wysłane, a autoresponder do klienta zawiedzie — zapytanie liczy się jako **udane**. Powiadomienie wewnętrzne ma bezwzględne pierwszeństwo. |
| **BR-14** | Jeśli żądanie pochodzi z gałęzi `podglad` — poczta trafia na adres testowy administratora, nigdy na skrzynkę firmową. |
| **BR-16** | Jeśli wysyłka poczty zawiedzie całkowicie — użytkownik dostaje komunikat z aktywnymi przyciskami WhatsApp i telefonu, a wypełnione dane pozostają w formularzu. |
| **BR-20** | Jeśli domena nie jest zweryfikowana w Resend — autoresponder do klientów nie działa. **Weryfikacja domeny jest warunkiem uruchomienia US-03.** |

### Treść i komunikacja

| ID | Reguła |
|---|---|
| **BR-06** | Jeśli galeria nie zawiera zdjęć — cała sekcja nie renderuje się w ogóle. Nigdy nie pokazujemy pustej ramki ani napisu „wkrótce". |
| **BR-07** | Jeśli galeria zawiera 30 zdjęć — dodanie kolejnego jest blokowane do czasu usunięcia któregoś. |
| **BR-08** | Jeśli przesyłane zdjęcie przekracza 5 MB — zostaje odrzucone z komunikatem po polsku. Zdjęcia poniżej limitu są kompresowane automatycznie przy publikacji. |
| **BR-17** | Jeśli nazwa atestu nie została potwierdzona dokumentem — na stronie może pojawić się wyłącznie sformułowanie „tkanina z atestem higienicznym", bez nazwy własnej. Nazw certyfikatów nie wolno zgadywać. |
| **BR-18** | Jeśli temat dotyczy zdejmowania i prania pokrowca albo wnoszenia do mieszkania — strona go nie porusza. Nie zaprzeczamy, nie eksponujemy; rozstrzyga obsługa w rozmowie. |
| **BR-19** | Jeśli treść zawiera imię, nazwisko lub dane identyfikujące właściciela — nie może zostać opublikowana. Dotyczy też kodu źródłowego, metadanych zdjęć EXIF i commitów. |
| **BR-21** | Jeśli treść zawiera kwotę, widełki cenowe lub procent oszczędności — nie może zostać opublikowana. |
| **BR-22** | Jeśli treść zawiera liczbę wykonanych materacy — nie może zostać opublikowana. Obowiązuje sformułowanie jakościowe. |
| **BR-23** | Jeśli treść obiecuje efekt zdrowotny („wyleczy", „usunie ból") — nie może zostać opublikowana. Dopuszczalne są sformułowania o podparciu kręgosłupa i komforcie. |

### Prywatność i pomiar

| ID | Reguła |
|---|---|
| **BR-15** | Strona nie używa ciasteczek ani śledzenia między witrynami, więc **nie wyświetla bannera cookies**. Jeśli kiedykolwiek zostanie dodany Google Analytics, Pixel Facebooka lub podobne narzędzie — banner staje się obowiązkowy, a ta reguła traci ważność. |
| **BR-24** | Dane z zapytań istnieją wyłącznie w skrzynce pocztowej. Nie tworzymy bazy danych ani nie zapisujemy zapytań na serwerze. Okres przechowywania: 12 miesięcy od ostatniego kontaktu. |
| **BR-25** | Jeśli klient poprosi o usunięcie danych — realizuje to obsługa, usuwając korespondencję ze skrzynki. Brak innych miejsc przechowywania jest tu zaletą. |

### Publikacja

| ID | Reguła |
|---|---|
| **BR-26** | Gałąź `podglad` → adres podglądowy z `noindex`. Gałąź `main` → wersja produkcyjna na domenie. Publikacja to scalenie `podglad` w `main`. |
| **BR-27** | Zmiany zapisane przez redaktora w CMS trafiają od razu na produkcję, bez akceptacji. Zakres pól CMS jest tak ograniczony, że nie da się nimi zepsuć strony. |
| **BR-28** | Każda publikacja jest odwracalna — historia repozytorium pozwala przywrócić dowolny wcześniejszy stan, łącznie z usuniętymi zdjęciami. **Nic w tym systemie nie jest nieodwracalne.** |

---

## 5. WARUNKI ODBIORU I BLOKADY

### Test odbiorczy przed publikacją

| # | Scenariusz | Kryterium |
|---|---|---|
| 1 | Wysłanie zapytania z telefonu | Mail u obsługi w < 60 s, wszystkie pola czytelne |
| 2 | Wysłanie zapytania z komputera | j.w. |
| 3 | Zapytanie z e-mailem | Klient dostaje autoresponder |
| 4 | Zapytanie bez e-maila (sam telefon) | Sukces bez błędu, brak autorespondera |
| 5 | Formularz bez kontaktu | Zablokowany, czytelny komunikat |
| 6 | Formularz bez zgody RODO | Zablokowany, czytelny komunikat |
| 7 | Kliknięcie WhatsApp na telefonie | Otwiera aplikację, puste pole wiadomości |
| 8 | Kliknięcie WhatsApp na komputerze | Otwiera WhatsApp Web |
| 9 | Kliknięcie numeru na telefonie | Otwiera dialer |
| 10 | Dodanie zdjęcia przez redaktora **bez pomocy administratora** | Widoczne na żywo w < 3 min |
| 11 | PageSpeed mobile | ≥ 90 |
| 12 | Przegląd całej strony | Zero nazwisk, zero kwot, zero liczby materacy, zero nazw certyfikatów |

> Punkt 10 jest **najważniejszym testem w całym projekcie**. Jeśli redaktor nie przejdzie go samodzielnie, CMS nie spełnia swojego zadania — a galeria pozostanie pusta na zawsze.

### Blokady publikacji

| # | Czego brakuje | Co blokuje |
|---|---|---|
| **A** | Pełne dane firmy: nazwa, NIP, adres | US-10 — polityka prywatności i klauzula RODO. **Formularz nie może działać legalnie bez tego.** |
| **B** | Nazwa, wystawca i numer atestu pokrowca | Nie blokuje publikacji — obowiązuje sformułowanie zastępcze z BR-17. |
| **C** | Domena zarejestrowana i zweryfikowana w Resend | US-03 — autoresponder. Zapytania do firmy działają bez tego. |
| **D** | Konto GitHub dla redaktora | US-12 — CMS. Strona działa bez tego, ale nie da się jej aktualizować. |

### Wyłączone z zakresu v1

Konto klienta i logowanie · koszyk i płatności · cennik i konfigurator wyceny · katalog modeli · blog i teksty poradnikowe · wersja obcojęzyczna · sekcja o poprawce twardości · mini-wywiad o twardości · upload zdjęć w formularzu · powiadomienia SMS o nowym zapytaniu · baza danych zapytań · panel statystyk dla właściciela.
