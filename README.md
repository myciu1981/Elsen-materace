# elsen.com.pl — gałąź wdrożeniowa

Ta gałąź (`wdrozenie`) **nie zawiera źródeł strony**. Leżą w niej gotowe,
zbudowane pliki, które cPanel kopiuje pod `elsen.com.pl`. Źródła są na `main`,
w katalogu `artifacts/elsen-materace` (Vite + React, treść prerenderowana do HTML).

## Po co osobna gałąź

cPanelowy Git Version Control potrafi tylko sklonować repo i przekopiować pliki
według `.cpanel.yml`. Nie uruchomi `pnpm` ani `vite`, więc wdrożenie `main`
położyłoby pod domeną TypeScript, którego przeglądarka nie przeczyta. Build musi
się wykonać wcześniej, na maszynie, która ma Node'a — a jego wynik musi gdzieś
czekać w postaci plików. Czeka tutaj.

Gałąź jest osobna, żeby historia `main` została historią zmian w treści strony,
a nie strumieniem 2 MB zbudowanych plików przy każdej poprawce literówki.

## Wdrożenie

Praca idzie w osobnym katalogu roboczym (`git worktree`), żeby nie przełączać
gałęzi w repo ze źródłami:

```powershell
cd C:\Users\USER\Projects\elsen-wdrozenie
.\zbuduj.ps1
git add -A
git commit -m "opis zmiany"
git push
```

`zbuduj.ps1` sam ściąga najnowszy `main`, buduje go (klient → SSR → prerender)
i przekłada wynik do `site/`.

Potem w cPanelu: **Git™ Version Control → Manage → Pull or Deploy**:

1. **Update from Remote** — ściąga commit z GitHuba
2. **Deploy HEAD Commit** — wykonuje `.cpanel.yml`

Oba kroki, w tej kolejności. Sam `git push` niczego nie wdraża.

## Formularz wyceny

`site/api/quote.php` przyjmuje zgłoszenia z formularza pod adresem `/api/quote`
(przepisanie w `.htaccess`). Na Replicie robił to serwer Express, którego shared
hosting nie uruchomi.

Klucz do Resend **nie jest w repo**. Czeka w pliku
`/home/myciu/elsen-config.php`, piętro nad katalogiem publicznym:

```php
<?php
return ['resend_api_key' => 're_...'];
```

Plik zakłada się raz, ręcznie, przez Menedżer plików cPanela. Wdrożenie go nie
rusza. Bez niego formularz dalej działa, ale wysyła przez lokalną pocztę
serwera, a nie przez Resend — a SPF domeny wskazuje na Amazon SES, więc taka
wiadomość ma gorszą dostarczalność.

Zgłoszenia, których nie udało się wysłać, lądują w
`/home/myciu/elsen-quote-failed.log`. Pusty plik to dobra wiadomość.

## Czego tu nie zmieniać

`.htaccess`, `robots.txt`, `sitemap.xml` i `api/quote.php` w `site/` są
**wynikiem builda** — poprawia się je na `main`, w
`artifacts/elsen-materace/public/`. Zmiana zrobiona tutaj zniknie przy
najbliższym `.\zbuduj.ps1`.
