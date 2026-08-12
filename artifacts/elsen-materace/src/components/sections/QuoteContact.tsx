import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'wouter';
import { toast } from 'sonner';
import { useSubmitQuote } from '@workspace/api-client-react';
import { Phone, Mail, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const quoteSchema = z.object({
  width: z.string().min(1, "Szerokość jest wymagana"),
  length: z.string().min(1, "Długość jest wymagana"),
  phone: z.string().optional(),
  email: z.string().optional(),
  notes: z.string().max(2000, "Maksymalnie 2000 znaków").optional(),
  website: z.string().optional(),
  rodo: z.boolean().refine(val => val === true, {
    message: "Zgoda jest niezbędna, żebyśmy mogli odpowiedzieć."
  })
}).superRefine((data, ctx) => {
  if (!data.phone && !data.email) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Podaj telefon albo e-mail — wystarczy jedno.",
      path: ["phone"]
    });
  }
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export default function QuoteContact() {
  const submitQuote = useSubmitQuote();
  const [errorMsg, setErrorMsg] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      width: "",
      length: "",
      phone: "",
      email: "",
      notes: "",
      website: "",
      rodo: false
    }
  });

  const width = watch("width");
  const length = watch("length");
  const numWidth = Number(width);
  const numLength = Number(length);
  const showSizeWarning = (width && (numWidth < 50 || numWidth > 250)) || (length && (numLength < 50 || numLength > 250));
  const notesValue = watch("notes") || "";

  React.useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [cooldown]);

  const onSubmit = (data: QuoteFormValues) => {
    if (cooldown > 0) return;
    setErrorMsg("");
    submitQuote.mutate({
      data: {
        width: Number(data.width),
        length: Number(data.length),
        phone: data.phone || null,
        email: data.email || null,
        notes: data.notes || null,
        website: data.website || null
      }
    }, {
      onSuccess: () => {
        setCooldown(60);
        reset();
        toast.success('Zapytanie wysłane. Skontaktujemy się wkrótce.', {
          duration: 6000,
        });
      },
      onError: () => {
        setErrorMsg("Nie udało się wysłać. Napisz na WhatsApp albo zadzwoń — odpowiemy tak samo szybko.");
      }
    });
  };

  return (
    <>
      {/* Anchor for #kontakt — sits just before the section so scroll-mt offsets navbar */}
      <div id="kontakt" className="scroll-mt-20" />
      <section
        id="wycena"
        className="py-14 md:py-20"
        style={{ backgroundColor: 'hsl(var(--navy))' }}
      >

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">

          {/* ── LEFT: contact info ── */}
          <div className="flex flex-col gap-7">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-primary uppercase mb-3">Kontakt</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                Zapytaj<br />o wycenę
              </h2>
              <p className="text-muted-foreground max-w-sm text-[16px]">
                Zadzwoń lub napisz — a my doradzimy. Wycena jest bezpłatna i do niczego nie zobowiązuje.
                Odpowiadamy zwykle w ciągu kilku godzin, najpóźniej w 24 godziny.
              </p>
            </div>

            <div className="flex flex-col divide-y divide-white/10">
              <a href="tel:504810841" className="flex items-center gap-4 py-4 group">
                <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
                  <Phone className="text-primary w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.15em] text-primary/70 uppercase mb-0.5">Telefon</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-[16px]">504 810 841</p>
                </div>
              </a>

              <a href="mailto:elsen.materace@gmail.com" className="flex items-center gap-4 py-4 group">
                <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
                  <Mail className="text-primary w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.15em] text-primary/70 uppercase mb-0.5">E-mail</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-[16px]">elsen.materace@gmail.com</p>
                </div>
              </a>

              <a href="https://wa.me/48504810841" target="_blank" rel="noreferrer" className="flex items-center gap-4 py-4 group">
                <div className="w-10 h-10 rounded-full border border-[#25D366]/20 flex items-center justify-center group-hover:border-[#25D366] transition-colors shrink-0">
                  <MessageCircle className="text-[#25D366] w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.15em] text-[#25D366]/60 uppercase mb-0.5">WhatsApp</p>
                  <p className="font-semibold text-foreground group-hover:text-[#25D366] transition-colors text-[16px]">Napisz do nas</p>
                </div>
              </a>
            </div>
          </div>

          {/* ── RIGHT: quote form ── */}
          <div>
            {errorMsg && (
              <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-sm mb-5 flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0" />
                <p className="text-xs font-medium">{errorMsg}</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/5 border border-white/10 p-5 md:p-7 rounded-sm shadow-2xl relative overflow-hidden space-y-4"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />
              <input type="text" {...register("website")} style={{ opacity: 0, position: 'absolute', left: '-9999px' }} tabIndex={-1} aria-hidden="true" />

              {/* Wymiary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="width" className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    Szerokość (cm) <span className="text-primary">*</span>
                  </Label>
                  <Input id="width" type="number" placeholder="np. 160" {...register("width")} className="bg-card h-9 text-sm" />
                  {errors.width && <p className="text-destructive text-[10px]">{errors.width.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="length" className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    Długość (cm) <span className="text-primary">*</span>
                  </Label>
                  <Input id="length" type="number" placeholder="np. 200" {...register("length")} className="bg-card h-9 text-sm" />
                  {errors.length && <p className="text-destructive text-[10px]">{errors.length.message}</p>}
                </div>
              </div>

              {showSizeWarning && (
                <div className="text-primary/90 text-xs flex items-start gap-2 bg-primary/10 border border-primary/20 p-3 rounded-sm">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                  <span>Podany wymiar jest nietypowy. Oczywiście wykonamy taki materac — upewnij się, że wartości są poprawne.</span>
                </div>
              )}

              {/* Kontakt */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">Telefon</Label>
                  <Input id="phone" type="tel" placeholder="np. 500 600 700" {...register("phone")} className="bg-card h-9 text-sm" />
                  {errors.phone && <p className="text-destructive text-[10px]">{errors.phone.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">E-mail</Label>
                  <Input id="email" type="email" placeholder="np. jan@example.pl" {...register("email")} className="bg-card h-9 text-sm" />
                </div>
              </div>

              {/* Uwagi */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <Label htmlFor="notes" className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    Uwagi (opcjonalnie)
                  </Label>
                  <span className="text-[10px] text-muted-foreground/50 font-mono">{notesValue.length}/2000</span>
                </div>
                <Textarea
                  id="notes"
                  placeholder="Napisz, co Ci przeszkadza w obecnym materacu — pomoże nam dobrać twardość."
                  {...register("notes")}
                  className="bg-card min-h-[100px] text-sm"
                />
              </div>

              {/* RODO */}
              <div className="flex items-start gap-3 bg-card/40 p-4 rounded-sm border border-white/5">
                <Checkbox
                  id="rodo"
                  checked={watch("rodo")}
                  onCheckedChange={(checked) => setValue("rodo", checked === true)}
                  className="mt-0.5 shrink-0"
                />
                <div>
                  <Label htmlFor="rodo" className="text-[11px] font-normal text-muted-foreground leading-relaxed cursor-pointer select-none">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przygotowania wyceny i kontaktu w tej sprawie.{' '}
                    Administratorem danych jest ELSEN. Dane przetwarzamy wyłącznie w celu odpowiedzi na Twoje zapytanie, na podstawie Twojej zgody. Przechowujemy je przez 12 miesięcy od ostatniego kontaktu. Masz prawo dostępu do danych, ich poprawienia, usunięcia oraz wycofania zgody w dowolnym momencie. Szczegóły w{' '}
                    <Link href="/polityka-prywatnosci" className="text-primary hover:underline">polityce prywatności</Link>.
                  </Label>
                  {errors.rodo && <p className="text-destructive text-[10px] mt-1">{errors.rodo.message}</p>}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitQuote.isPending || cooldown > 0}
                  className="w-full inline-flex items-center justify-center h-11 px-8 rounded-sm bg-primary text-primary-foreground text-sm font-semibold tracking-wider hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                >
                  {submitQuote.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Wyślij zapytanie"}
                </button>
                <p className="text-[10px] text-muted-foreground mt-3 text-center uppercase tracking-widest">Bezpłatnie i bez zobowiązań</p>
                {cooldown > 0 && <p className="text-[10px] text-primary mt-1 text-center">Możesz wysłać ponownie za {cooldown}s</p>}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
