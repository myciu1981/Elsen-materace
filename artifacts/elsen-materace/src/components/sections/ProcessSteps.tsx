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

export default function ProcessSteps() {
  return (
    <section
      id="jak-to-dziala"
      className="py-24 md:py-32 relative scroll-mt-20"
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

                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-14 -right-4 w-8 h-[1px] bg-primary/25" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
