import React from 'react';
import { motion } from 'framer-motion';

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

export default function ProcessTestimonials() {
  return (
    <>
      <section className="py-24 md:py-32 bg-card relative">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Jak to działa</h2>
            <div className="w-24 h-1 bg-primary mb-16 mx-auto md:mx-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative group p-6 border border-transparent hover:border-white/5 hover:bg-background/50 rounded-sm transition-all duration-300">
                  <div className="text-7xl font-serif text-primary/35 mb-6 group-hover:text-primary/55 transition-colors">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-serif text-primary mb-4">{step.title}</h3>
                  <p className="text-muted-foreground font-normal leading-relaxed">
                    {step.desc}
                  </p>
                  
                  {/* Connector line on desktop */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-14 -right-4 w-8 h-[1px] bg-primary/20"></div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-background border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-8">Dlaczego klienci nas polecają</h2>
            <p className="text-lg text-muted-foreground mb-20 font-light max-w-2xl mx-auto">
              Prawie wszyscy nasi klienci trafili do nas z polecenia. Nie mamy budżetu reklamowego — mamy ludzi, którzy dobrze śpią i mówią o tym dalej.
            </p>
            
            <div className="relative bg-card border border-card-border p-12 md:p-16 rounded-sm shadow-xl">
              <span className="absolute -top-8 -left-2 md:-left-6 text-9xl text-primary/10 font-serif leading-none select-none">"</span>
              <p className="text-2xl md:text-4xl font-serif text-foreground leading-tight italic relative z-10 mb-10">
                Wreszcie się wyspałem. Nie zapada się, twardość jest idealna. Czuć, że to jest jakość i dobre wykonanie.
              </p>
              <span className="absolute -bottom-16 -right-2 md:-right-6 text-9xl text-primary/10 font-serif leading-none rotate-180 select-none">"</span>
              
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-primary/30"></div>
                <p className="text-primary tracking-widest uppercase text-sm font-medium">
                  klient z Wielkopolski
                </p>
                <div className="h-[1px] w-12 bg-primary/30"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
