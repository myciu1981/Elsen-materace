# Buduje elsen.com.pl ze źródeł i przekłada wynik do site/.
#
# Uruchamiać z PowerShella, nie z Git Basha — MSYS zamienia BASE_PATH="/" na
# ścieżkę C:/Program Files/Git/ i wszystkie odnośniki w index.html wychodzą
# wtedy jako /Program Files/Git/assets/...
#
#   .\zbuduj.ps1
#   git add -A; git commit -m "opis zmiany"; git push
#
# Potem w cPanelu: Git Version Control -> Manage -> Pull or Deploy ->
# Update from Remote, a następnie Deploy HEAD Commit. Oba kroki, w tej kolejności.
#
# Build idzie przez `node vite.js` z pominięciem pnpm: `pnpm run build` odpala
# najpierw sprawdzenie zależności, które woła skrypt `preinstall` z `sh -c`,
# a `sh` nie jest na PATH PowerShella.

$ErrorActionPreference = 'Stop'

# Vite pisze ostrzeżenia na stderr, a PowerShell przy 'Stop' traktuje każdą linię
# stderr z programu zewnętrznego jak błąd i przerywa build. Stąd uruchamianie
# node'a przez tę funkcję: liczy się wyłącznie kod wyjścia.
function Uruchom {
  param([string[]]$Argumenty, [string]$Opis)

  $poprzednie = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try {
    & node @Argumenty
  } finally {
    $ErrorActionPreference = $poprzednie
  }

  if ($LASTEXITCODE -ne 0) { throw "$Opis zwrócił $LASTEXITCODE" }
}

$repo   = 'C:\Users\USER\Projects\elsen'
$zrodla = Join-Path $repo 'artifacts\elsen-materace'
$site   = Join-Path $PSScriptRoot 'site'

if (-not (Test-Path $zrodla)) {
  throw "Nie widzę repo ze źródłami: $zrodla"
}

# Lockfile ze źródeł powstał na Linuksie i nie zna binariów dla Windows, więc
# pnpm ich nie zainstaluje. Bez nich build wywala się na braku modułu.
$natywne = @{
  '@rollup/rollup-win32-x64-msvc@4.62.3'      = 'node_modules\@rollup\rollup-win32-x64-msvc'
  '@esbuild/win32-x64@0.27.3'                 = 'node_modules\@esbuild\win32-x64'
  'lightningcss-win32-x64-msvc@1.32.0'        = 'node_modules\lightningcss-win32-x64-msvc'
  '@tailwindcss/oxide-win32-x64-msvc@4.3.3'   = 'node_modules\@tailwindcss\oxide-win32-x64-msvc'
}
foreach ($pakiet in $natywne.Keys) {
  $sciezka = Join-Path $repo $natywne[$pakiet]
  if (-not (Test-Path $sciezka)) {
    throw "Brakuje binariów dla Windows: $pakiet. Rozpakuj `npm pack $pakiet` do $sciezka"
  }
}

Write-Host "==> Pobieram najnowszy main ze źródeł" -ForegroundColor Cyan
Push-Location $repo
try {
  git fetch origin
  $za = (git rev-list --count HEAD..origin/main)
  if ($za -ne '0') {
    Write-Host "    lokalne repo jest $za commitów w tyle — robię fast-forward" -ForegroundColor Yellow
    git merge --ff-only origin/main
  } else {
    Write-Host "    już aktualne"
  }
} finally { Pop-Location }

Write-Host "==> Buduję" -ForegroundColor Cyan
Push-Location $zrodla
try {
  $env:BASE_PATH = '/'
  $env:PORT      = '8080'
  $env:NODE_ENV  = 'production'
  $env:ESBUILD_BINARY_PATH = Join-Path $repo 'node_modules\@esbuild\win32-x64\esbuild.exe'

  Uruchom @('.\node_modules\vite\bin\vite.js', 'build', '--config', 'vite.config.ts') 'vite build'

  # Drugi build renderuje aplikację po stronie serwera, trzeci krok wstawia
  # gotowy HTML do szablonu. Bez nich strona przyjechałaby pusta dla robotów.
  Uruchom @('.\node_modules\vite\bin\vite.js', 'build', '--config', 'vite.config.ts',
            '--ssr', 'src/entry-server.tsx', '--outDir', 'dist/server') 'vite build --ssr'

  Uruchom @('.\scripts\prerender.mjs') 'prerender'
} finally { Pop-Location }

$dist = Join-Path $zrodla 'dist\public'
foreach ($plik in @('index.html', '404.html', '.htaccess', 'api\quote.php')) {
  if (-not (Test-Path (Join-Path $dist $plik))) {
    throw "Build nie zostawił $plik w $dist"
  }
}

# Kontrola, czy ścieżki wyszły z ukośnikiem, a nie z podmienioną przez MSYS
# ścieżką do Gita — to najczęstszy sposób, w jaki ten build cicho się psuje.
$html = Get-Content (Join-Path $dist 'index.html') -Raw
if ($html -notmatch 'src="/assets/') {
  throw "index.html nie ma odnośników zaczynających się od /assets/ — sprawdź BASE_PATH"
}
if ($html -match 'www\.elsen\.com\.pl') {
  throw "index.html wskazuje na www.elsen.com.pl — kanoniczny adres jest bez www"
}

Write-Host "==> Przekładam do site/" -ForegroundColor Cyan
if (Test-Path $site) { Remove-Item $site -Recurse -Force }
New-Item -ItemType Directory -Path $site | Out-Null
Copy-Item (Join-Path $dist '*') $site -Recurse -Force
# Copy-Item z maską pomija pliki zaczynające się od kropki
Copy-Item (Join-Path $dist '.htaccess') $site -Force

if (-not (Test-Path (Join-Path $site '.htaccess'))) {
  throw "Brakuje .htaccess w site/ — bez niego nie ma HTTPS, przekierowań ani cache"
}

$ile = (Get-ChildItem $site -Recurse -File -Force).Count
$mb  = [math]::Round(((Get-ChildItem $site -Recurse -File -Force | Measure-Object Length -Sum).Sum / 1MB), 1)
Write-Host "==> Gotowe: $ile plików, $mb MB w site/" -ForegroundColor Green
Write-Host "    Teraz: git add -A; git commit -m '...'; git push" -ForegroundColor Green
