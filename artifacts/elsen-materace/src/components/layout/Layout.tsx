import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import StickyWhatsApp from './StickyWhatsApp';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans relative selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}
