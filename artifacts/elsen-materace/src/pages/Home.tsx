import React from 'react';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import AboutOffer from '@/components/sections/AboutOffer';
import TechSpine from '@/components/sections/TechSpine';
import ProcessTestimonials from '@/components/sections/ProcessTestimonials';
import Gallery from '@/components/sections/Gallery';
import Delivery from '@/components/sections/Delivery';
import QuoteContact from '@/components/sections/QuoteContact';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutOffer />
      <TechSpine />
      <ProcessTestimonials />
      <Gallery />
      <Delivery />
      <QuoteContact />
    </>
  );
}
