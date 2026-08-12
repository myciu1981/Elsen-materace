import React from 'react';
import Hero from '@/components/sections/Hero';
import AboutOffer from '@/components/sections/AboutOffer';
import TechSpine from '@/components/sections/TechSpine';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Delivery from '@/components/sections/Delivery';
import Testimonials from '@/components/sections/Testimonials';
import Gallery from '@/components/sections/Gallery';
import QuoteContact from '@/components/sections/QuoteContact';

// Kotwice (#oferta, #co-jest-w-srodku, #jak-to-dziala, #dostawa, #wycena) są zdefiniowane
// wewnątrz samych sekcji, razem z klasą scroll-mt-20. Opakowywanie ich tutaj w <div>
// o tym samym id tworzyło zduplikowane identyfikatory w dokumencie.
export default function Home() {
  return (
    <>
      <Hero />
      <AboutOffer />
      <TechSpine />
      <ProcessSteps />
      <Delivery />
      <Testimonials />
      <Gallery />
      <QuoteContact />

      {/* Odstęp pod przyklejony pasek nawigacji na telefonie */}
      <div className="h-24 md:hidden" aria-hidden="true" />
    </>
  );
}
