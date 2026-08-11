import React from 'react';
import Hero from '@/components/sections/Hero';
import AboutOffer from '@/components/sections/AboutOffer';
import TechSpine from '@/components/sections/TechSpine';
import ProcessTestimonials from '@/components/sections/ProcessTestimonials';
import Gallery from '@/components/sections/Gallery';
import Delivery from '@/components/sections/Delivery';
import QuoteContact from '@/components/sections/QuoteContact';

export default function Home() {
  return (
    <>
      {/* Hero — no scroll-target needed, it's the top */}
      <Hero />

      {/* Oferta + O nas */}
      <div id="oferta">
        <AboutOffer />
      </div>

      {/* Co jest w środku + Kręgosłup */}
      <div id="co-jest-w-srodku">
        <TechSpine />
      </div>

      {/* Jak to działa + Opinie */}
      <div id="jak-to-dziala">
        <ProcessTestimonials />
      </div>

      <Gallery />

      {/* Dostawa */}
      <div id="dostawa">
        <Delivery />
      </div>

      {/* Wycena */}
      <div id="wycena">
        <QuoteContact />
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="h-24 md:hidden" aria-hidden="true" />
    </>
  );
}
