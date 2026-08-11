import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Piszesz albo dzwonisz",
    desc: "Podajesz wymiary i mówisz, co Ci przeszkadza w obecnym materacu. Wycena jest bezpłatna i do niczego nie zobowiązuje."
  },
  {
    num: "02",
    title: "Rozmawiamy i dobieramy twardość",
    desc: "Pytamy o wagę, wzrost i sposób spania. Zadzwoń lub napisz — a my doradzimy."
  },
  {
    num: "03",
    title: "Wykonujemy do 14 dni",
    desc: "Materac powstaje w naszej pracowni. Ręcznie, jeden naraz."
  },
  {
    num: "04",
    title: "Dowozimy",
    desc: "Własnym transportem w promieniu 100 km od Nowego Tomyśla. Dalej — kurierem na terenie całej Polski. Możliwy też odbiór osobisty."
  }
];

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

export default function ProcessTestimonials() {
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
    <>
      {/* ── Jak to działa – navy background ── */}
      <section
        className="py-24 md:py-32 relative"
        style={{ backgroundColor: 'hsl(var(--navy))' }}
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Jak to działa</h2>
            <div className="w-24 h-1 bg-primary mb-16 mx-auto md:mx-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="relative group p-6 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-primary/30 rounded-sm transition-all duration-300"
                >
                  <div className="text-7xl font-serif text-primary/40 mb-6 group-hover:text-primary/60 transition-colors leading-none">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-serif text-primary mb-4">{step.title}</h3>
                  <p className="text-muted-foreground font-normal leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Connector line on desktop */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-14 -right-4 w-8 h-[1px] bg-primary/25" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Opinie klientów ── */}
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
            <p className="text-lg text-muted-foreground mb-16 font-normal max-w-2xl mx-auto">
              Prawie wszyscy nasi klienci trafili do nas z polecenia. Nie mamy budżetu
              reklamowego — mamy ludzi, którzy dobrze śpią i mówią o tym dalej.
            </p>

            {/* Carousel */}
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

              {/* Nav arrows */}
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

            {/* Dots */}
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
    </>
  );
}
