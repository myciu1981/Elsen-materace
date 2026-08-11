import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, SlidersHorizontal, Layers, User } from 'lucide-react';
import aboutImg from "@assets/ChatGPT_Image_9_sie_2026,_15_43_58_1786409178370.png";
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
  { icon: Ruler,            title: 'Dowolny wymiar',               desc: 'Robimy również materace na nietypowe łóżka i indywidualne zamówienia.' },
  { icon: SlidersHorizontal, title: 'Twardość dobrana do Ciebie', desc: 'Waga, pozycja snu i indywidualne odczucia mają znaczenie. Dobieramy konstrukcję tak, żeby materac był wygodny i dawał odpowiednie podparcie.' },
  { icon: Layers,           title: 'Ty wybierasz, co jest w środku', desc: 'Pianki, mata kokosowa, sprężyny kieszeniowe, filc — pokazujemy Ci możliwości i wspólnie dobieramy warstwy.' },
];

export default function AboutOffer() {
  return (
    <section className="py-24 md:py-32 relative" style={{ backgroundColor: light.bg }}>
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
                <h3 className="text-xl mb-3" style={{ color: light.heading }}>{f.title}</h3>
                <p className="text-sm leading-relaxed font-normal" style={{ color: light.muted }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Bullet list */}
          <div
            className="max-w-4xl mx-auto p-8 md:p-12 rounded-sm shadow-sm"
            style={{ backgroundColor: light.card, border: `1px solid ${light.border}` }}
          >
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm md:text-base font-normal"
                style={{ color: light.body }}>
              {[
                'Materace premium — wykonywane pojedynczo, nie z magazynu',
                'Wszystkie rozmiary — również na indywidualne zamówienie',
                'Materace sprężynowe i hybrydowe — sprężyny kieszeniowe w połączeniu z warstwami pianki',
                'Dobór twardości — pod Twoją wagę i sposób spania',
                'Wybór materiałów i konfiguracji warstw — decydujesz, co jest w środku',
                'Produkcja w Polsce — w naszej pracowni w Wielkopolsce',
                'Krótkie terminy realizacji — do 14 dni',
                'Konkurencyjne ceny — kupujesz w pracowni, bez marży salonu',
              ].map((item) => (
                <li key={item} className="flex gap-4">
                  <span className="mt-1 shrink-0 font-bold" style={{ color: light.bullet }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
