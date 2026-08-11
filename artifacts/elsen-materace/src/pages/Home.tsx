import React from 'react';
import Hero from '@/components/sections/Hero';
import AboutOffer from '@/components/sections/AboutOffer';
import TechSpine from '@/components/sections/TechSpine';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Delivery from '@/components/sections/Delivery';
import Testimonials from '@/components/sections/Testimonials';
import Gallery from '@/components/sections/Gallery';
import QuoteContact from '@/components/sections/QuoteContact';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Oferta + O nas */}
      <div id="oferta">
        <AboutOffer />
      </div>

      {/* Co jest w środku */}
      <div id="co-jest-w-srodku">
        <TechSpine />
      </div>

      {/* Jak to działa */}
      <div id="jak-to-dziala">
        <ProcessSteps />
      </div>

      {/* Dostawa */}
      <div id="dostawa">
        <Delivery />
      </div>

      {/* Opinie klientów */}
      <Testimonials />

      <Gallery />

      {/* Wycena */}
      <div id="wycena">
        <QuoteContact />
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="h-24 md:hidden" aria-hidden="true" />
    </>
  );
}
