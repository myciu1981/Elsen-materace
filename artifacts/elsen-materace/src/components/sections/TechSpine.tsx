import React from 'react';
import { motion } from 'framer-motion';
import techImage from '@assets/ChatGPT_Image_3_sie_2026,_08_07_00_1785777081434.png';
import spineImage from '@assets/ChatGPT_Image_3_sie_2026,_08_00_12_1785777081433.png';
import { Activity, ShieldCheck, Heart } from 'lucide-react';
import { LightboxImage } from '@/components/ui/LightboxImage';

export default function TechSpine() {
  return (
    <>
      <section className="py-24 md:py-32 bg-card border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-6">Twój komfort, nasza jakość</h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Oferujemy materace w standardowych rozmiarach oraz wykonujemy materace na indywidualne
              zamówienie. Poniżej to, co znajdziesz w środku.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-8">
              <div className="bg-background border border-white/5 p-8 md:p-10 rounded-sm">
                <h3 className="text-2xl text-primary mb-4">Sprężyny kieszeniowe</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Każda sprężyna pracuje niezależnie i jest wykonana ze stali wysokiej jakości,
                  która nie odkształca się przez lata i nie pęka. Dzięki temu materac podpiera
                  ciało punktowo, a ruch drugiej osoby nie przenosi się na Twoją stronę łóżka.
                </p>
              </div>
              <div className="bg-background border border-white/5 p-8 md:p-10 rounded-sm">
                <h3 className="text-2xl text-primary mb-4">Pianki wysokiej gęstości</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Używamy wyłącznie pianek o wysokiej gęstości, w kilku wariantach dobieranych do
                  wagi. To one decydują o tym, czy materac po roku zrobi dolinę, czy utrzyma kształt
                  przez lata.
                </p>
              </div>
              <div className="bg-background border border-white/5 p-8 md:p-10 rounded-sm">
                <h3 className="text-2xl text-primary mb-4">Pokrowiec z atestem</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Tkanina materacowa najwyższej jakości, z atestem higienicznym. To jedyna warstwa,
                  której dotykasz przez całą noc — dlatego nie oszczędzamy na niej.
                </p>
              </div>
            </div>

            <div className="relative h-full flex flex-col justify-center">
              <div className="absolute inset-0 bg-primary/5 translate-x-4 -translate-y-4 rounded-sm" />
              <LightboxImage
                src={techImage}
                alt="Przekrój warstw materaca ELSEN"
                className="relative z-10 w-full h-auto rounded-sm shadow-2xl grayscale-[20%]"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-muted-foreground uppercase tracking-widest font-medium border-t border-white/5 pt-16">
            <span className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-primary" /> Wysokiej jakości materiały
            </span>
            <span className="flex items-center gap-3">
              <Heart size={20} className="text-primary" /> Zdrowy i komfortowy sen
            </span>
            <span className="flex items-center gap-3">
              <Activity size={20} className="text-primary" /> Trwałość na długie lata
            </span>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl text-foreground mb-4">
                Właściwe podparcie kręgosłupa
              </h2>
              <h3 className="text-2xl text-primary mb-10 italic font-light">Odcinek lędźwiowy</h3>

              <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed mb-12">
                <p>
                  Materac Elsen dopasowuje się do naturalnych krzywizn ciała, zapewniając właściwe
                  podparcie odcinka lędźwiowego. Budź się wypoczęty.
                </p>
                <p>
                  Zbyt miękki lub źle dopasowany materac powoduje nienaturalne wygięcie kręgosłupa
                  — a to prowadzi do napięcia mięśni i gorszej jakości snu.
                </p>
                <p className="text-foreground font-normal border-l-2 border-primary pl-6 py-2">
                  Dlatego twardości nie wybieramy z listy. Ustalamy ją na podstawie Twojej wagi,
                  wzrostu i tego, jak śpisz.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-medium tracking-wide">
                {[
                  'Zdrowe podparcie kręgosłupa',
                  'Redukcja napięcia mięśni',
                  'Lepsza jakość snu',
                  'Gwarancja komfortu',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 bg-card border border-white/5 p-4 rounded-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <LightboxImage
                src={spineImage}
                alt="Prawidłowe i nieprawidłowe ułożenie kręgosłupa"
                className="w-full h-auto rounded-sm shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
