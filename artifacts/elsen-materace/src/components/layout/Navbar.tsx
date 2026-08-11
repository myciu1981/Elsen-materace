import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Layers, Package, ListChecks, Truck, FileText, MessageCircle } from 'lucide-react';
import logoPath from '@assets/elsen_logo_main_1786416405159.png';

const navLinks = [
  { label: 'OFERTA', href: '#oferta' },
  { label: 'CO JEST W ŚRODKU', href: '#co-jest-w-srodku' },
  { label: 'JAK TO DZIAŁA', href: '#jak-to-dziala' },
  { label: 'DOSTAWA', href: '#dostawa' },
];

const mobileNavRow1 = [
  { label: 'Oferta', href: '#oferta', Icon: Layers },
  { label: 'Co w środku', href: '#co-jest-w-srodku', Icon: Package },
  { label: 'Jak działa', href: '#jak-to-dziala', Icon: ListChecks },
];

const mobileNavRow2 = [
  { label: 'Dostawa', href: '#dostawa', Icon: Truck },
  { label: 'Wycena', href: '#wycena', Icon: FileText },
  { label: 'WhatsApp', href: 'https://wa.me/48504810841', Icon: MessageCircle, external: true },
];

function scrollTo(href: string) {
  if (href.startsWith('#')) {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    window.open(href, '_blank', 'noreferrer');
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show full nav on main page; on sub-pages just show logo + phone
  const isHome = location === '/';

  return (
    <>
      {/* ── Desktop / tablet header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:flex ${
          scrolled
            ? 'bg-[#0a0a0a]/92 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between w-full">
          {/* Logo — scrolls to top on home, navigates home elsewhere */}
          <Link
            href="/"
            onClick={(e: React.MouseEvent) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center shrink-0 group"
          >
            <img
              src={logoPath}
              alt="ELSEN Materace"
              className="h-10 object-contain group-hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Centered section links */}
          {isHome && (
            <nav className="flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                  className="relative text-[11px] font-semibold tracking-[0.15em] text-white/75 hover:text-primary transition-colors duration-200 group py-1"
                  data-testid={`nav-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>
          )}

          {/* Phone button */}
          <a
            href="tel:504810841"
            className="shrink-0 border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground px-5 py-2 rounded-sm text-[13px] font-semibold tracking-wider transition-all duration-200"
            data-testid="nav-phone"
          >
            504 810 841
          </a>
        </div>
      </header>

      {/* ── Mobile bottom navigation ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0d]/96 backdrop-blur-md border-t border-white/10"
        data-testid="mobile-bottom-nav"
      >
        {/* Row 1 */}
        <div className="grid grid-cols-3 border-b border-white/5">
          {mobileNavRow1.map(({ label, href, Icon }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="flex flex-col items-center justify-center gap-1 py-2.5 text-white/60 hover:text-primary active:text-primary transition-colors"
              data-testid={`mobile-nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span className="text-[9px] font-semibold tracking-wider uppercase">{label}</span>
            </button>
          ))}
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-3">
          {mobileNavRow2.map(({ label, href, Icon, external }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
                label === 'WhatsApp'
                  ? 'text-[#25D366] hover:text-[#25D366]/80 active:text-[#25D366]/80'
                  : 'text-white/60 hover:text-primary active:text-primary'
              }`}
              data-testid={`mobile-nav-${label.toLowerCase()}`}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span className="text-[9px] font-semibold tracking-wider uppercase">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
