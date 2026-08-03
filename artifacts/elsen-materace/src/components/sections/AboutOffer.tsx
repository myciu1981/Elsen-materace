import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, SlidersHorizontal, Layers, User } from 'lucide-react';
import aboutImg from '@assets/ChatGPT_Image_3_sie_2026,_07_56_34_1785777081432.png';
import { LightboxImage } from '@/components/ui/LightboxImage';

const features = [
  { icon: Ruler, title: 'Dowolne wymiary', desc: 'Wszystkie rozmiary, również nietypowe' },
  { icon: SlidersHorizontal, title: 'Dobór twardości', desc: 'Pod Twoją wagę i sposób spania' },
  { icon: Layers, title: 'Wybór materiałów', desc: 'Ty decydujesz o konfiguracji warstw' },
  { icon: User, title: 'Dopasowanie', desc: 'Do Twoich potrzeb, nie do średniej statystycznej' },
];

export default function AboutOffer() {
  return (
    <section className="py-24 md:py-32 relative bg-background">
      <div className="container mx-auto px-6 md:px-12">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-8">Witaj w ELSEN Materace</h2>
            <div className="space-y-6 text-muted-foreground text-lg font-normal leading-relaxed">
              <p>
                W ELSEN wierzymy, że dobry sen to podstawa dobrego życia. Dlatego każdy materac
                tworzymy z dbałością o najmniejszy detal — tak, aby zapewnić trwałość, wygodę
                i odpowiednie podparcie kręgosłupa.
              </p>
              <p>
                Jesteśmy małą manufakturą spod Nowego Tomyśla. Każdy materac szyje ręcznie mistrz
                tapicerstwa z ponad dwudziestoletnim doświadczeniem, zdobytym w wielkopolskim
                zagłębiu meblarskim przy produkcji mebli najwyższej klasy.
              </p>
              <p className="text-primary font-medium">
                Nie produkujemy masowo. Robimy jeden materac naraz — dla konkretnej osoby,
                o konkretnej wadze, śpiącej w konkretny sposób.
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
            <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 rounded-sm" />
            <LightboxImage
              src={aboutImg}
              alt="Jasna minimalistyczna sypialnia z materacem"
              className="relative z-10 w-full h-auto object-cover rounded-sm grayscale-[20%] hover:grayscale-0 transition-all duration-700 shadow-2xl"
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
          <h2 className="text-4xl md:text-5xl text-foreground mb-16 text-center">Nasza oferta</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-card-border p-8 rounded-sm hover:border-primary/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/50 transition-all duration-300">
                  <f.icon className="text-primary w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-normal">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-card border border-white/5 p-8 md:p-12 rounded-sm shadow-xl">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-muted-foreground text-sm md:text-base font-normal">
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
                  <span className="text-primary mt-1 shrink-0">•</span>
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
