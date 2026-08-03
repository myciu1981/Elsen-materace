import React from 'react';

// IMPORTANT: Do not remove or populate without user instruction.
// Feature requirement BR-06: Galeria MUST be hidden if no images.
const galleryImages: string[] = []; 

export default function Gallery() {
  if (galleryImages.length === 0) return null;

  return (
    <section className="py-24 bg-card border-b border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-12 text-center">Nasze realizacje</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {galleryImages.map((src, i) => (
            <div key={i} className="aspect-square bg-muted rounded-sm overflow-hidden border border-white/5 relative group cursor-pointer">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img src={src} alt={`Realizacja ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
