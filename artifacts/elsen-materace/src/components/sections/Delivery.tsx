import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Package } from 'lucide-react';

export default function Delivery() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Gdzie dowozimy</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card border border-card-border p-10 rounded-sm text-center group transition-all duration-300 hover:shadow-2xl hover:border-primary/30"
          >
            <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-8 group-hover:bg-primary/10 transition-colors">
              <Truck className="text-primary w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-foreground mb-4">Własnym transportem</h3>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">
              W promieniu 100 km od Nowego Tomyśla: Poznań, Leszno, Wolsztyn, Grodzisk Wielkopolski, Międzyrzecz, Zielona Góra, Gorzów Wielkopolski.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card border border-card-border p-10 rounded-sm text-center group transition-all duration-300 hover:shadow-2xl hover:border-primary/30"
          >
            <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-8 group-hover:bg-primary/10 transition-colors">
              <Package className="text-primary w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-foreground mb-4">Kurierem</h3>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">
              Na terenie całej Polski.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card border border-card-border p-10 rounded-sm text-center group transition-all duration-300 hover:shadow-2xl hover:border-primary/30"
          >
            <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-8 group-hover:bg-primary/10 transition-colors">
              <MapPin className="text-primary w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-foreground mb-4">Odbiór osobisty</h3>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">
              W naszej pracowni, po wcześniejszym umówieniu.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
