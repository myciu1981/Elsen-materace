<?php
/**
 * Formularz wyceny — odpowiednik POST /api/quote z artifacts/api-server.
 *
 * Na cPanelu nie ma Node'a, więc trasa Express została przepisana na PHP.
 * Kontrakt wejścia i wyjścia jest identyczny (JSON in, JSON out), dzięki czemu
 * front nie wymaga żadnej zmiany — `.htaccess` przepisuje /api/quote na ten plik.
 *
 * Klucz Resend siedzi w /home/<konto>/elsen-config.php, czyli POZA katalogiem
 * publicznym: plik w docroocie byłby nadpisywany przy każdym wdrożeniu i wyciekłby
 * do repozytorium. Bez klucza wiadomość idzie przez lokalny serwer poczty — lead
 * dociera, ale dostarczalność jest gorsza, bo SPF domeny wskazuje na Amazon SES.
 *
 * Składnia celowo trzyma się PHP 7.4, żeby nie zależeć od wersji ustawionej
 * w MultiPHP Manager.
 */

declare(strict_types=1);

const COMPANY_EMAIL = 'elsen.materace@gmail.com';
const COMPANY_PHONE = '504 810 841';
const WHATSAPP_LINK = 'https://wa.me/48504810841';
const MAIL_FROM     = 'ELSEN Materace <wycena@elsen.com.pl>';
const OK_MESSAGE    = 'Dziękujemy! Odezwiemy się wkrótce.';

// Maksymalnie tyle zgłoszeń z jednego adresu IP na godzinę.
const RATE_LIMIT = 5;

// Poza katalogiem publicznym: api -> elsen.com.pl -> public_html -> katalog domowy.
const PRIVATE_DIR = __DIR__ . '/../../..';

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(int $status, string $error): void
{
    respond($status, ['error' => $error]);
}

function ok(): void
{
    respond(200, ['success' => true, 'message' => OK_MESSAGE]);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Metoda niedozwolona.');
}

/**
 * Limit zgłoszeń na adres IP.
 *
 * Za Cloudflare REMOTE_ADDR to adres proxy, ten sam dla wszystkich odwiedzających —
 * limit liczony po nim zablokowałby cały ruch po piątym zgłoszeniu.
 */
function rateLimited(string $ip): bool
{
    $file = sys_get_temp_dir() . '/elsen-quote-' . sha1($ip) . '.txt';
    $now = time();
    $hits = [];

    if (is_readable($file)) {
        $raw = (string) file_get_contents($file);
        foreach (explode("\n", trim($raw)) as $line) {
            $t = (int) $line;
            if ($t > $now - 3600) {
                $hits[] = $t;
            }
        }
    }

    if (count($hits) >= RATE_LIMIT) {
        return true;
    }

    $hits[] = $now;
    @file_put_contents($file, implode("\n", $hits), LOCK_EX);

    return false;
}

/** Przycina wartość i usuwa znaki sterujące, którymi da się doklejać własne nagłówki maila. */
function cleanField($value, int $max): ?string
{
    if (!is_string($value)) {
        return null;
    }

    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value);
    $value = trim((string) $value);

    return $value === '' ? null : mb_substr($value, 0, $max);
}

function sendViaResend(string $key, string $to, string $subject, string $text, ?string $replyTo = null): array
{
    $payload = [
        'from'    => MAIL_FROM,
        'to'      => [$to],
        'subject' => $subject,
        'text'    => $text,
    ];
    if ($replyTo !== null) {
        $payload['reply_to'] = [$replyTo];
    }

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $key,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
    ]);

    $body = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $err  = curl_error($ch);
    curl_close($ch);

    if ($body === false) {
        return [false, 'curl: ' . $err];
    }
    if ($code < 200 || $code >= 300) {
        return [false, 'resend ' . $code . ': ' . (string) $body];
    }

    return [true, ''];
}

function sendViaMail(string $to, string $subject, string $text, ?string $replyTo = null): bool
{
    $headers = [
        'From: ' . MAIL_FROM,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
    ];
    if ($replyTo !== null) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }

    $encoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    return mail($to, $encoded, $text, implode("\r\n", $headers));
}

// ── Wejście ────────────────────────────────────────────────────────────────

$data = json_decode((string) file_get_contents('php://input'), true);

if (!is_array($data)) {
    fail(422, 'Nieprawidłowe dane formularza.');
}

/* Honeypot: boty wypełniają ukryte pole, ludzie nie. Odpowiadamy sukcesem,
   żeby bot nie dowiedział się, że został rozpoznany. */
if (!empty($data['website'])) {
    ok();
}

$width  = filter_var($data['width'] ?? null, FILTER_VALIDATE_INT);
$length = filter_var($data['length'] ?? null, FILTER_VALIDATE_INT);

if ($width === false || $length === false
    || $width < 1 || $width > 999
    || $length < 1 || $length > 999) {
    fail(422, 'Podaj wymiary w centymetrach.');
}

$phone = cleanField($data['phone'] ?? null, 40);
$email = cleanField($data['email'] ?? null, 200);
$notes = cleanField($data['notes'] ?? null, 2000);

if ($email !== null && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'Adres e-mail wygląda na niepoprawny.');
}

if ($phone === null && $email === null) {
    fail(422, 'Podaj telefon albo e-mail — wystarczy jedno.');
}

$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

if (rateLimited($ip)) {
    fail(429, 'Zbyt wiele zgłoszeń. Zadzwoń albo napisz na WhatsApp.');
}

// ── Treści wiadomości ──────────────────────────────────────────────────────

$ownerBody = sprintf(
    "Nowe zapytanie o wycenę materaca.\n\n"
    . "Wymiary: %d × %d cm\n\n"
    . "Telefon: %s\n"
    . "E-mail: %s\n\n"
    . "Uwagi:\n%s\n\n"
    . "---\n"
    . 'Wiadomość wysłana przez formularz na stronie ELSEN Materace.',
    $width,
    $length,
    $phone ?? '—',
    $email ?? '—',
    $notes ?? 'Brak uwag.'
);

$customerBody = sprintf(
    "Dziękujemy za zapytanie!\n\n"
    . "Otrzymaliśmy Twoją prośbę o wycenę materaca %d × %d cm.\n\n"
    . "Odpiszemy wkrótce — zwykle w ciągu kilku godzin, najpóźniej w ciągu 24 godzin.\n\n"
    . "Jeśli chcesz porozmawiać wcześniej:\n"
    . "📞 %s\n"
    . "💬 WhatsApp: %s\n\n"
    . "Pozdrawiamy,\n"
    . 'Zespół ELSEN Materace',
    $width,
    $length,
    COMPANY_PHONE,
    WHATSAPP_LINK
);

// ── Wysyłka ────────────────────────────────────────────────────────────────

$config = @include PRIVATE_DIR . '/elsen-config.php';
$apiKey = is_array($config) && isset($config['resend_api_key']) ? (string) $config['resend_api_key'] : '';

$subject = sprintf('Nowe zapytanie o wycenę: %d×%d cm', $width, $length);

if ($apiKey !== '') {
    list($sent, $problem) = sendViaResend($apiKey, COMPANY_EMAIL, $subject, $ownerBody, $email);
} else {
    $sent = sendViaMail(COMPANY_EMAIL, $subject, $ownerBody, $email);
    $problem = $sent ? '' : 'mail() zwrócił false';
}

if (!$sent) {
    /* Zgłoszenie zapisujemy zawsze, nawet gdy wysyłka padła — inaczej lead przepada
       bez śladu, a klient widzi tylko komunikat o błędzie. */
    @file_put_contents(
        PRIVATE_DIR . '/elsen-quote-failed.log',
        date('c') . "\t" . $problem . "\t"
            . json_encode(compact('width', 'length', 'phone', 'email', 'notes'), JSON_UNESCAPED_UNICODE) . "\n",
        FILE_APPEND | LOCK_EX
    );

    fail(500, 'Nie udało się wysłać zapytania. Skontaktuj się z nami bezpośrednio.');
}

// Autoresponder jest dodatkiem — jego błąd nie może wywrócić zgłoszenia.
if ($email !== null) {
    $customerSubject = 'Dziękujemy za zapytanie — ELSEN Materace';
    if ($apiKey !== '') {
        sendViaResend($apiKey, $email, $customerSubject, $customerBody);
    } else {
        sendViaMail($email, $customerSubject, $customerBody);
    }
}

ok();
