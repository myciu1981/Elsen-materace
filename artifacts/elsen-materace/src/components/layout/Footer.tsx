import React from 'react';
import { Link } from 'wouter';
import logoPath from '@assets/ELSEN_logo_z_hasłem_1786463523409.png';

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <img src={logoPath} alt="ELSEN Materace" className="h-24 object-contain mb-4" />
            <p className="text-muted-foreground mb-2">Komfort, na który zasługujesz</p>
            <p className="text-sm text-muted-foreground/70">Polska produkcja · 24 miesiące gwarancji</p>
          </div>
          <div className="md:text-right space-y-2 text-sm text-muted-foreground">
            <div className="flex flex-col md:items-end gap-3 mt-2">
              <Link href="/polityka-prywatnosci" className="hover:text-primary transition-colors">
                Polityka prywatności
              </Link>
              <a
                href="https://www.facebook.com/profile.php?id=61592419575226"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <FacebookIcon />
                <span>Facebook</span>
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
