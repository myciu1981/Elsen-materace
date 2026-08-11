import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, Link } from 'wouter';
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
  const [_, setLocation] = useLocation();
  const submitQuote = useSubmitQuote();
  const [errorMsg, setErrorMsg] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<QuoteFormValues>({
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
        setLocation('/dziekujemy');
      },
      onError: () => {
        setErrorMsg("Nie udało się wysłać. Napisz na WhatsApp albo zadzwoń — odpowiemy tak samo szybko.");
      }
    });
  };

  return (
    <>
      <section id="wycena" className="py-24 md:py-32 scroll-mt-20" style={{ backgroundColor: 'hsl(var(--navy))' }}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Zapytaj o wycenę</h2>
              <p className="text-lg text-muted-foreground font-normal leading-relaxed">
                Zadzwoń lub napisz — a my doradzimy. Wycena jest bezpłatna i do niczego nie zobowiązuje. Odpowiadamy zwykle w ciągu kilku godzin, najpóźniej w 24 godziny.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-destructive/10 border border-destructive/50 text-destructive px-6 py-4 rounded-sm mb-8 flex items-center gap-4">
                <AlertCircle size={24} className="shrink-0" />
                <p className="text-sm font-medium">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none" />
              
              <input type="text" {...register("website")} style={{ opacity: 0, position: 'absolute', left: '-9999px' }} tabIndex={-1} aria-hidden="true" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="width" className="text-muted-foreground">Szerokość (cm) <span className="text-primary">*</span></Label>
                  <Input id="width" type="number" placeholder="np. 160" {...register("width")} className="bg-card" />
                  {errors.width && <p className="text-destructive text-xs mt-1">{errors.width.message}</p>}
                </div>
                <div className="space-y-3">
                  <Label htmlFor="length" className="text-muted-foreground">Długość (cm) <span className="text-primary">*</span></Label>
                  <Input id="length" type="number" placeholder="np. 200" {...register("length")} className="bg-card" />
                  {errors.length && <p className="text-destructive text-xs mt-1">{errors.length.message}</p>}
                </div>
              </div>

              {showSizeWarning && (
                <div className="text-primary/90 text-sm flex items-start gap-3 bg-primary/10 border border-primary/20 p-4 rounded-sm">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>Podany wymiar jest nietypowy. Oczywiście wykonamy taki materac, upewnij się tylko, że wpisane wartości są poprawne.</span>
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-muted-foreground">Telefon</Label>
                <Input id="phone" type="tel" placeholder="Wystarczy telefon albo e-mail" {...register("phone")} className="bg-card" />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-muted-foreground">E-mail</Label>
                <Input id="email" type="email" placeholder="Wystarczy telefon albo e-mail" {...register("email")} className="bg-card" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <Label htmlFor="notes" className="text-muted-foreground">Uwagi</Label>
                  <span className="text-xs text-muted-foreground/50 font-mono">{notesValue.length}/2000</span>
                </div>
                <Textarea 
                  id="notes" 
                  placeholder="Napisz, co Ci przeszkadza w obecnym materacu — pomoże nam dobrać twardość." 
                  {...register("notes")} 
                  className="bg-card min-h-[150px]"
                />
              </div>

              <div className="flex items-start space-x-4 bg-card/50 p-5 rounded-sm border border-white/5">
                <Checkbox 
                  id="rodo" 
                  checked={watch("rodo")}
                  onCheckedChange={(checked) => setValue("rodo", checked === true)} 
                  className="mt-1"
                />
                <div className="grid gap-2 leading-none">
                  <Label htmlFor="rodo" className="text-xs font-normal text-muted-foreground leading-relaxed cursor-pointer select-none">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przygotowania wyceny i kontaktu w tej sprawie. 
                    Administratorem danych jest [NAZWA FIRMY], [ADRES], NIP [NIP]. Dane przetwarzamy wyłącznie w celu odpowiedzi na Twoje zapytanie, na podstawie Twojej zgody. Przechowujemy je przez 12 miesięcy od ostatniego kontaktu. Masz prawo dostępu do danych, ich poprawienia, usunięcia oraz wycofania zgody w dowolnym momencie. Szczegóły w <Link href="/polityka-prywatnosci" className="text-primary hover:underline">polityce prywatności</Link>.
                  </Label>
                  {errors.rodo && <p className="text-destructive text-xs mt-1">{errors.rodo.message}</p>}
                </div>
              </div>

              <div className="pt-6 text-center border-t border-white/5">
                <button
                  type="submit"
                  disabled={submitQuote.isPending || cooldown > 0}
                  className="w-full md:w-auto inline-flex items-center justify-center h-14 px-16 rounded-sm bg-primary text-primary-foreground font-semibold tracking-wide hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                >
                  {submitQuote.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Wyślij zapytanie"}
                </button>
                <p className="text-xs text-muted-foreground mt-6 uppercase tracking-widest font-medium">Bezpłatnie i bez zobowiązań</p>
                {cooldown > 0 && <p className="text-xs text-primary mt-2">Możesz wysłać ponownie za {cooldown}s</p>}
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="pt-12 pb-24 md:pt-16 md:pb-32 text-center relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--navy))' }}>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Zapraszamy do kontaktu</h2>
          <p className="text-lg text-muted-foreground font-normal mb-16 max-w-xl mx-auto">
            Pomożemy dobrać materac idealnie dopasowany do Twoich potrzeb.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 mb-20">
            <a href="tel:504810841" className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-card border border-card-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                <Phone className="text-primary w-8 h-8" />
              </div>
              <span className="text-xl font-serif text-foreground group-hover:text-primary transition-colors tracking-wide">504 810 841</span>
            </a>
            
            <a href="mailto:elsen.materace@gmail.com" className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-card border border-card-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                <Mail className="text-primary w-8 h-8" />
              </div>
              <span className="text-xl font-serif text-foreground group-hover:text-primary transition-colors tracking-wide">elsen.materace@gmail.com</span>
            </a>

            <a href="https://wa.me/48504810841" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-[#25D366]/5 border border-[#25D366]/20 flex items-center justify-center group-hover:border-[#25D366] group-hover:bg-[#25D366]/10 transition-all duration-300">
                <MessageCircle className="text-[#25D366] w-8 h-8" />
              </div>
              <span className="text-xl font-serif text-foreground group-hover:text-[#25D366] transition-colors tracking-wide">Napisz na WhatsApp</span>
            </a>
          </div>

          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
            Pracownia: Nowy Tomyśl i okolice
          </p>
        </div>
      </section>
    </>
  );
}
