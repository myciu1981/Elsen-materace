import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    text: "Wreszcie się wyspałem! Nie zapada się po kilku miesiącach, twardość jest idealna. Czuć jakość wykonania.",
    author: "Wojtek",
    location: "Poznań"
  },
  {
    text: "Pierwsza noc była dziwna, ale kolejne – niesamowite. Nie zdawałem sobie sprawy, że spałem na takim słabym materacu do tej pory. Przestawienie się z tandety na jakość chwilę zajmuje, ale potem doceniasz i wiesz, że warto zainwestować w zdrowie.",
    author: "Adam",
    location: "Nowy Tomyśl"
  },
  {
    text: 'Znajoma mnie namówiła. Miałam wątpliwości – jak to, materac nie z \u201Emarkowego\u201D sklepu? Po tygodniu spania na nowym już wiem, że warto było kupić w Elsen. Manufaktura, dbałość o szczegóły, produkt dla wymagających klientów!',
    author: "Jadwiga",
    location: "Grodzisk Wielkopolski"
  },
  {
    text: "Tyle miesięcy mnie plecy bolały. Najgorzej rano, musiałem wstawać, bo lędźwie nie dawały rady! Zawsze myślałem, że miękki materac = wygodny materac. Może na chwilę. Twardość materaca Elsen jest idealnie dobrana! Polecam.",
    author: "Adrian",
    location: "Stęszew"
  },
  {
    text: "Jestem wyspana jak nigdy, dzisiaj nie mogłam się obudzić.",
    author: "Ania",
    location: "Poznań"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  function goTo(idx: number) {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }

  function prev() {
    setDirection(-1);
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  }

  function next() {
    setDirection(1);
    setCurrent(c => (c + 1) % testimonials.length);
  }

  const t = testimonials[current];

  return (
    <section className="py-32 bg-background border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
            Dlaczego klienci nas polecają
          </h2>
          <p className="text-lg text-muted-foreground mb-16 font-normal max-w-2xl mx-auto">Prawie wszyscy nasi klienci trafili do nas z polecenia. Nie mamy ogromnego budżetu reklamowego —  mamy pasję i klientów, którzy dobrze śpią i mówią o tym dalej!</p>

          <div className="relative bg-card border border-card-border rounded-sm shadow-xl overflow-hidden">
            <span className="absolute -top-6 -left-2 md:-left-4 text-9xl text-primary/10 font-serif leading-none select-none pointer-events-none z-0">
              "
            </span>

            <div className="relative min-h-[220px] flex items-center px-10 md:px-16 py-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full relative z-10"
                >
                  <p className="text-xl md:text-2xl font-serif text-foreground leading-snug italic mb-8">
                    {t.text}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-[1px] w-10 bg-primary/30" />
                    <p className="text-primary tracking-widest uppercase text-sm font-medium">
                      {t.author}, {t.location}
                    </p>
                    <div className="h-[1px] w-10 bg-primary/30" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={prev}
              aria-label="Poprzednia opinia"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 hover:bg-primary/20 border border-white/10 hover:border-primary/40 text-white/60 hover:text-primary transition-all z-20"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Następna opinia"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 hover:bg-primary/20 border border-white/10 hover:border-primary/40 text-white/60 hover:text-primary transition-all z-20"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Opinia ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-2 bg-primary'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
