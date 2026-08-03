import React from 'react';

export default function TrustBar() {
  return (
    <div className="border-y border-white/5 bg-card/50 backdrop-blur-sm relative z-20">
      <div className="container mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-serif text-primary italic">"Prawie wszyscy nasi klienci przyszli z polecenia."</h3>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium">
            <span>Polska produkcja</span>
            <span className="hidden sm:inline text-primary/40">·</span>
            <span>Wysoka jakość</span>
            <span className="hidden sm:inline text-primary/40">·</span>
            <span>24 miesiące gwarancji</span>
          </div>
        </div>
      </div>
    </div>
  );
}
