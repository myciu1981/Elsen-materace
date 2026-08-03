import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import logoPath from '@assets/logo_1785777081436.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <img 
            src={logoPath} 
            alt="ELSEN Materace" 
            className="h-8 md:h-10 object-contain group-hover:opacity-80 transition-opacity" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="tel:504810841" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide"
          >
            Zadzwoń: 504 810 841
          </a>
          <a 
            href="#wycena" 
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(201,168,76,0.15)] hover:shadow-[0_0_25px_rgba(201,168,76,0.3)]"
          >
            Zapytaj o wycenę
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border py-6 px-6 flex flex-col gap-6 shadow-xl">
          <a 
            href="tel:504810841" 
            className="text-base font-medium text-foreground hover:text-primary transition-colors"
          >
            Zadzwoń: 504 810 841
          </a>
          <a 
            href="#wycena" 
            className="bg-primary text-primary-foreground px-6 py-3 rounded-sm text-center text-sm font-semibold hover:bg-primary/90 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Zapytaj o wycenę
          </a>
        </div>
      )}
    </header>
  );
}
