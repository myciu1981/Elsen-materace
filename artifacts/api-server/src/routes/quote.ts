import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { SubmitQuoteBody, SubmitQuoteResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// Temporary: Resend sandbox sends only to the Resend account owner email.
// Switch back to elsen.materace@gmail.com after domain verification (task #15).
const COMPANY_EMAIL = "jacekpierwszyy@gmail.com";
const COMPANY_PHONE = "504 810 841";
const WHATSAPP_LINK = "https://wa.me/48504810841";

function buildOwnerEmail(data: {
  width: number;
  length: number;
  phone?: string | null;
  email?: string | null;
  notes?: string | null;
}): string {
  const { width, length, phone, email, notes } = data;
  return `
Nowe zapytanie o wycenę materaca.

Wymiary: ${width} × ${length} cm

Telefon: ${phone || "—"}
E-mail: ${email || "—"}

Uwagi:
${notes || "Brak uwag."}

---
Wiadomość wysłana przez formularz na stronie ELSEN Materace.
`.trim();
}

function buildCustomerEmail(data: {
  width: number;
  length: number;
  email: string;
}): string {
  const { width, length } = data;
  return `
Dziękujemy za zapytanie!

Otrzymaliśmy Twoją prośbę o wycenę materaca ${width} × ${length} cm.

Odpiszemy wkrótce — zwykle w ciągu kilku godzin, najpóźniej w ciągu 24 godzin.

Jeśli chcesz porozmawiać wcześniej:
📞 ${COMPANY_PHONE}
💬 WhatsApp: ${WHATSAPP_LINK}

Pozdrawiamy,
Zespół ELSEN Materace
`.trim();
}

router.post("/quote", async (req, res): Promise<void> => {
  const parsed = SubmitQuoteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ error: parsed.error.message });
    return;
  }

  const { width, length, phone, email, notes, website } = parsed.data;

  // Honeypot check — bots fill this field, humans don't
  if (website) {
    req.log.warn("Honeypot triggered — discarding submission");
    // Return success to not tip off bots
    res.json(SubmitQuoteResponse.parse({ success: true, message: "Dziękujemy! Odezwiemy się wkrótce." }));
    return;
  }

  // Require at least one contact method
  if (!phone && !email) {
    res.status(422).json({ error: "Podaj telefon albo e-mail — wystarczy jedno." });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    // Graceful fallback: log the submission and return success
    req.log.warn(
      { width, length, phone: phone ?? null, email: email ?? null, notes: notes ?? null },
      "RESEND_API_KEY not configured — quote request logged but not emailed"
    );
    res.json(SubmitQuoteResponse.parse({ success: true, message: "Dziękujemy! Odezwiemy się wkrótce." }));
    return;
  }

  const resend = new Resend(resendApiKey);

  // Send notification email to the owner
  // NOTE: "from" uses Resend sandbox sender until elsen-materace.pl domain is verified (task #15)
  const ownerEmailResult = await resend.emails.send({
    from: "ELSEN Materace <onboarding@resend.dev>",
    to: COMPANY_EMAIL,
    subject: `Nowe zapytanie o wycenę: ${width}×${length} cm`,
    text: buildOwnerEmail({ width, length, phone, email, notes }),
  });

  if (ownerEmailResult.error) {
    req.log.error({ error: ownerEmailResult.error }, "Failed to send owner notification email");
    res.status(500).json({ error: "Nie udało się wysłać zapytania. Skontaktuj się z nami bezpośrednio." });
    return;
  }

  req.log.info({ emailId: ownerEmailResult.data?.id }, "Owner notification email sent");

  // Optionally send autoresponder to the customer (best-effort, don't fail if it errors)
  if (email) {
    const customerEmailResult = await resend.emails.send({
      from: "noreply@elsen-materace.pl",
      to: email,
      subject: "Dziękujemy za zapytanie — ELSEN Materace",
      text: buildCustomerEmail({ width, length, email }),
    });

    if (customerEmailResult.error) {
      req.log.warn({ error: customerEmailResult.error }, "Failed to send customer autoresponder — continuing");
    } else {
      req.log.info({ emailId: customerEmailResult.data?.id }, "Customer autoresponder sent");
    }
  }

  res.json(SubmitQuoteResponse.parse({ success: true, message: "Dziękujemy! Odezwiemy się wkrótce." }));
});

export default router;
