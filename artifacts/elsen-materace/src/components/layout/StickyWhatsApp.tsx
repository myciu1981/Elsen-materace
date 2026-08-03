import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function StickyWhatsApp() {
  return (
    <a
      href="https://wa.me/48504810841"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_4px_25px_rgba(37,211,102,0.6)] transition-all duration-300 group"
      aria-label="Napisz na WhatsApp"
    >
      <MessageCircle size={28} className="fill-current" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-background border border-border text-foreground text-sm font-medium px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
        Napisz do nas
      </span>
    </a>
  );
}
