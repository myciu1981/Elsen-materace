import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '@assets/ChatGPT_Image_3_sie_2026,_08_01_24_1785777081434.png';

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Ciemna luksusowa sypialnia z materacem Elsen Premium" className="w-full h-full object-cover object-center scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="text-primary font-medium tracking-[0.25em] text-xs md:text-sm mb-8 uppercase">
            KOMFORT, NA KTÓRY ZASŁUGUJESZ
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground font-bold leading-[1.15] mb-8 drop-shadow-xl">
            Materace szyte ręcznie, <br className="hidden md:block"/>z twardością dobraną do Ciebie
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl font-light">
            Mała manufaktura pod Nowym Tomyślem. Sprężyny kieszeniowe ze stali odpornej na odkształcenia, pianki wysokiej gęstości, twardość ustalana z Twojej wagi i sposobu spania — nie z etykiety H2 czy H3.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mb-12">
            <a 
              href="#wycena" 
              className="inline-flex items-center justify-center h-14 px-8 rounded-sm bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors tracking-wide text-sm"
            >
              Zapytaj o wycenę
            </a>
            <a 
              href="https://wa.me/48504810841" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center justify-center h-14 px-8 rounded-sm border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors tracking-wide text-sm bg-background/20 backdrop-blur-sm"
            >
              Napisz na WhatsApp
            </a>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground/80 font-medium tracking-wide">
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
