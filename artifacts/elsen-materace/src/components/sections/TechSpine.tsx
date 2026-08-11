import React from 'react';
import { motion } from 'framer-motion';
import techImage from '@assets/ChatGPT_Image_10_sie_2026,_21_42_40_1786419810337.png';
import spineImage from '@assets/ChatGPT_Image_3_sie_2026,_08_00_12_1785777081433.png';
import { Activity, ShieldCheck, Heart } from 'lucide-react';
import { LightboxImage } from '@/components/ui/LightboxImage';

export default function TechSpine() {
  return (
    <>
      <section className="py-12 md:py-16 bg-card border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl text-foreground mb-6">Twój komfort, nasza jakość</h2>
            <p className="text-muted-foreground text-lg font-normal leading-relaxed">Dobry materac zaczyna się od tego, czego nie widać. Od sprężyn, pianek, materiałów i sposobu, w jaki wszystkie te warstwy ze sobą współpracują. Dlatego nie wybieramy ich przypadkowo.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-16">
            <div className="space-y-4">
              <div className="bg-background border border-white/5 p-5 md:p-6 rounded-sm">
                <h3 className="text-lg text-primary mb-3">Sprężyny kieszeniowe</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                  Każda sprężyna pracuje niezależnie od pozostałych. Dzięki temu materac reaguje na nacisk dokładnie tam, gdzie jest potrzebny, zamiast uginać się na całej powierzchni.
                  <br /><br />
                  To szczególnie ważne, gdy śpią dwie osoby — ruch jednej nie powinien budzić drugiej. Sprężyny wykonujemy z wysokiej jakości stali, która zachowuje swoje właściwości przez lata.
                </p>
              </div>
              <div className="bg-background border border-white/5 p-5 md:p-6 rounded-sm">
                <h3 className="text-lg text-primary mb-3">Pianki wysokiej gęstości</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                  Nie każda pianka nadaje się do materaca. Liczy się jej gęstość, sprężystość i odpowiednie dobranie do całej konstrukcji.
                  <br />
                  Dlatego korzystamy z pianek o wysokiej gęstości i różnych parametrach. Dobieramy je do konkretnej konstrukcji i wagi użytkownika.
                  <br /><br />
                  Bo to właśnie wnętrze materaca decyduje, czy po kilku latach nadal śpisz na materacu, czy zaczynasz szukać w nim swojej własnej doliny.
                </p>
              </div>
              <div className="bg-background border border-white/5 p-5 md:p-6 rounded-sm">
                <h3 className="text-lg text-primary mb-3">Pokrowiec z atestem</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                  Pokrowiec to nie tylko wygląd materaca. To materiał, który przez całą noc ma prawie bezpośredni kontakt z Twoim ciałem.
                  <br />
                  Dlatego wybieramy wysokiej jakości tkaniny materacowe z atestem higienicznym. Są przyjemne w dotyku, trwałe i odpowiednie do codziennego użytkowania.
                  <br /><br />
                  Na pokrowcu nie oszczędzamy. Bo trudno mówić o dobrym materacu, jeśli to właśnie jego powierzchnia jest najsłabszym elementem.
                </p>
              </div>
            </div>

            <div className="h-full overflow-hidden flex items-start">
              <LightboxImage
                src={techImage}
                alt="Przekrój warstw materaca ELSEN"
                className="w-full h-full object-contain object-top rounded-sm block shadow-2xl"
              />
            </div>
          </div>

        </div>
      </section>
      {/* Narrow trust strip */}
      <div className="border-y border-white/5 bg-card/60">
        <div className="container mx-auto px-6 md:px-12 py-4 md:py-5">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary shrink-0" /> Wysokiej jakości materiały
            </span>
            <span className="flex items-center gap-2">
              <Heart size={16} className="text-primary shrink-0" /> Zdrowy i komfortowy sen
            </span>
            <span className="flex items-center gap-2">
              <Activity size={16} className="text-primary shrink-0" /> Trwałość na długie lata
            </span>
          </div>
        </div>
      </div>
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
              <h3 className="text-2xl text-primary mb-10 italic font-normal">Odcinek lędźwiowy</h3>

              <div className="space-y-6 text-muted-foreground text-lg font-normal leading-relaxed mb-12">
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
              <div className="bg-background border border-white/8 rounded-sm p-6 md:p-8 shadow-2xl">
                <LightboxImage
                  src={spineImage}
                  alt="Prawidłowe i nieprawidłowe ułożenie kręgosłupa"
                  className="w-full h-auto rounded-sm block"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
