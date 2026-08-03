import React from 'react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-2xl text-primary mb-4">ELSEN MATERACE</h3>
            <p className="text-muted-foreground mb-2">Komfort, na który zasługujesz</p>
            <p className="text-sm text-muted-foreground/70 mb-6">Polska produkcja · 24 miesiące gwarancji</p>
          </div>
          <div className="md:text-right space-y-2 text-sm text-muted-foreground">
            <p className="text-foreground">[NAZWA FIRMY]</p>
            <p>NIP [NIP]</p>
            <p>[ADRES]</p>
            <div className="flex flex-col md:items-end gap-2 mt-6">
              <Link href="/polityka-prywatnosci" className="hover:text-primary transition-colors">
                Polityka prywatności
              </Link>
              <a 
                href="https://www.facebook.com/profile.php?id=61592419575226" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center text-xs text-muted-foreground/50">
          <p>© 2026 Elsen Materace. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
