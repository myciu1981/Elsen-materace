import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, SlidersHorizontal, Layers, User } from 'lucide-react';
import aboutImg from "@assets/ChatGPT_Image_9_sie_2026,_15_43_58_1786409178370.webp";
import { LightboxImage } from '@/components/ui/LightboxImage';

// Light-section colour tokens (inline so they work without Tailwind config changes)
const light = {
  bg: 'hsl(40 30% 95%)',
  card: 'hsl(0 0% 100%)',
  heading: 'hsl(222 47% 14%)',
  body: 'hsl(222 20% 28%)',
  muted: 'hsl(222 15% 42%)',
  border: 'hsl(40 20% 85%)',
  iconBg: 'hsl(222 47% 14%)',
  iconColor: 'hsl(40 30% 95%)',
  bullet: 'hsl(43 55% 42%)',
};

const features = [
  { icon: User,             title: 'Materac dopasowany do Ciebie', desc: 'Nie każdy śpi tak samo. Dlatego nie zaczynamy od pytania „jaki model wybrać?", tylko od tego, czego potrzebujesz.' },
  { icon: Ruler,            title: 'Dowolny wymiar',               desc: 'Robimy również materace na nietypowe łóżka i indywidualne zamówienia. Masz nietypowe łóżko? Potrzebujesz specjalny materac dla dzieci? Pomożemy!' },
  { icon: SlidersHorizontal, title: 'Indywidualnie dobrana twardość', desc: 'Waga, pozycja snu i indywidualne odczucia mają znaczenie. Dobieramy konstrukcję tak, żeby materac był wygodny i dawał odpowiednie podparcie.' },
  { icon: Layers,           title: 'Ty wybierasz, co jest w środku', desc: 'Pianki, mata kokosowa, sprężyny kieszeniowe, filc — pokazujemy Ci możliwości i wspólnie dobieramy warstwy.' },
];

export default function AboutOffer() {
  return (
    <section id="oferta" className="py-24 md:py-32 relative scroll-mt-20" style={{ backgroundColor: light.bg }}>
      <div className="container mx-auto px-6 md:px-12">

        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl md:text-5xl mb-8"
              style={{ color: light.heading }}
            >
              Witaj w ELSEN Materace
            </h2>
            <div className="space-y-6 text-lg font-normal leading-relaxed" style={{ color: light.body }}>
              <p>Dobry materac nie musi mieć wielkich słów na opakowaniu. Powinien po prostu dobrze robić swoją robotę  - być wygodny, dobrze podpierać ciało i służyć przez lata.

</p>
              <p>
                ELSEN to mała manufaktura spod Nowego Tomyśla. Materace powstają u nas ręcznie, jeden po drugim. Za ich wykonanie odpowiada mistrz tapicerstwa z ponad 20-letnim doświadczeniem, zdobywanym w wielkopolskim zagłębiu meblarskim, przy produkcji mebli najwyższej klasy.
              </p>
              <p className="font-semibold" style={{ color: 'hsl(43 55% 38%)' }}>
                Nie produkujemy masowo. Robimy jeden materac naraz - dla konkretnej osoby, o konkretnej wadze i sposobie spania. Dlatego możemy skupić się na tym, co naprawdę ma znaczenie: na jego wnętrzu, proporcjach poszczególnych warstw i jakości wykonania.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-sm"
              style={{ backgroundColor: 'hsl(43 55% 48% / 0.25)' }}
            />
            <LightboxImage
              src={aboutImg}
              width={1536}
              height={1024}
              alt="Jasna minimalistyczna sypialnia z materacem"
              className="relative z-10 w-full h-auto object-cover rounded-sm hover:grayscale-0 transition-all duration-700 shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Offer Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-5xl mb-16 text-center"
            style={{ color: light.heading }}
          >
            Nasza oferta
          </h2>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-sm transition-shadow duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: light.card,
                  border: `1px solid ${light.border}`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: light.iconBg }}
                >
                  <f.icon
                    className="w-6 h-6"
                    strokeWidth={1.5}
                    style={{ color: light.iconColor }}
                  />
                </div>
                <h3 className="text-xl mb-3 min-h-[3.5rem] flex items-start" style={{ color: light.heading }}>{f.title}</h3>
                <p className="font-normal text-[16px]" style={{ color: light.muted }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Dlaczego ELSEN */}
          <div
            className="max-w-4xl mx-auto p-8 md:p-14 rounded-sm shadow-md"
            style={{ backgroundColor: light.card, border: `1px solid ${light.border}` }}
          >
            <h3 className="text-2xl md:text-3xl font-extrabold mb-10 text-center" style={{ color: light.heading }}>
              Dlaczego ELSEN?
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7" style={{ color: light.body }}>
              {[
                ['Ręczna produkcja', 'każdy materac powstaje w naszej pracowni w Wielkopolsce.'],
                ['Sprawdzone materiały', 'wybieramy je przede wszystkim pod kątem trwałości i komfortu, nie tylko ceny.'],
                ['Sprężyny kieszeniowe i pianki', 'możemy łączyć różne warstwy, tworząc konstrukcję dopasowaną do Twoich potrzeb.'],
                ['Dowolne wymiary', 'również wtedy, gdy standardowy rozmiar po prostu nie pasuje.'],
                ['Do 14 dni realizacji', 'nie każemy Ci czekać miesiącami na materac.'],
                ['Bez salonowej marży', 'zamawiasz bezpośrednio w naszej pracowni.'],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex gap-4 text-base md:text-lg leading-relaxed">
                  <span className="mt-1 shrink-0 text-lg" style={{ color: light.bullet }}>★</span>
                  <span>
                    <span className="font-bold" style={{ color: light.heading }}>{bold}</span>
                    {' '}— {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
