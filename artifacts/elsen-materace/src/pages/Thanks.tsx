import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, ArrowLeft } from 'lucide-react';

export default function Thanks() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-20 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full bg-card border border-card-border p-10 md:p-16 rounded-sm text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6 relative z-10">Dziękujemy za zapytanie</h1>
        <p className="text-lg md:text-xl text-muted-foreground font-normal mb-16 relative z-10">
          Odezwiemy się w ciągu 24 godzin — zwykle znacznie szybciej.
        </p>

        <div className="space-y-8 mb-16 relative z-10 bg-background/50 border border-white/5 p-8 rounded-sm">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Jeśli chcesz porozmawiać od razu:</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="https://wa.me/48504810841" className="inline-flex items-center justify-center gap-3 h-14 px-8 rounded-sm bg-[#25D366] text-white font-semibold tracking-wide hover:bg-[#20b858] shadow-lg transition-colors">
              <MessageCircle size={22} />
              Napisz na WhatsApp
            </a>
            <a href="tel:504810841" className="inline-flex items-center justify-center gap-3 h-14 px-8 rounded-sm border border-primary text-primary font-semibold tracking-wide hover:bg-primary/10 transition-colors">
              <Phone size={22} />
              Zadzwoń: 504 810 841
            </a>
          </div>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground font-medium uppercase tracking-widest hover:text-primary transition-colors relative z-10">
          <ArrowLeft size={16} />
          Wróć na stronę główną
        </Link>
      </motion.div>
    </div>
  );
}
