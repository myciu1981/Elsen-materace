import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '@assets/ELSEN_main_1786409153785.webp';
import logoPath from '@assets/ELSEN_logo_z_hasłem_1786463523409.webp';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      {/* Background image with lighter overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Ciemna luksusowa sypialnia z materacem Elsen Premium"
          className="w-full h-full object-cover object-center"
          width={1536}
          height={1024}
          fetchPriority="high"
          decoding="async"
        />
        {/* Reduced opacity gradients to let photo breathe more */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>
      <div className="container relative z-10 mx-auto px-6 md:px-12 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* Logo — prominent in hero, above the tagline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4 md:mb-5"
          >
            <img
              src={logoPath}
              alt="ELSEN Materace — komfort, na który zasługujesz"
              className="h-[84px] md:h-[120px] object-contain drop-shadow-[0_0_30px_rgba(201,168,76,0.25)]"
              width={700}
              height={565}
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>

          <div className="text-primary font-semibold tracking-[0.25em] text-xs mb-4 uppercase">
            KOMFORT, NA KTÓRY ZASŁUGUJESZ
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.1] mb-4 drop-shadow-xl">
            Materace tworzone ręcznie,{' '}
            <br className="hidden md:block" />
            z twardością dobraną do Ciebie
          </h1>

          <p className="text-sm md:text-base text-white/70 mb-5 leading-relaxed max-w-2xl font-normal">Mała manufaktura pod Nowym Tomyślem. Produkujemy materace z komponentów wysokiej jakości. Sprężyny kieszeniowe ze stali odpornej na odkształcenia, pianki o dużej gęstości, pokrowce z certyfikowanych tkanin. Twardość ustalana indywidualnie. </p>

          <div className="inline-grid grid-cols-2 gap-3 mb-5">
            <a
              href="#wycena"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#wycena')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center h-11 px-4 rounded-sm bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors tracking-wide text-sm"
              data-testid="hero-cta-quote"
            >
              Zapytaj o wycenę
            </a>
            <a
              href="https://wa.me/48504810841"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center h-11 px-4 rounded-sm border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors tracking-wide text-sm bg-black/20 backdrop-blur-sm"
              data-testid="hero-cta-whatsapp"
            >
              Napisz na WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/60 font-medium tracking-wide">
            <span>Bezpłatna wycena</span>
            <span className="hidden sm:inline text-primary/50">·</span>
            <span>Odpowiadamy do 24 godzin</span>
            <span className="hidden sm:inline text-primary/50">·</span>
            <span>Realizacja do 14 dni</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
