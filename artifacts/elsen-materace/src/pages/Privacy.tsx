import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl prose prose-invert prose-gold">
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-12">Polityka prywatności</h1>
        <p className="text-lg font-normal text-muted-foreground leading-relaxed mb-8">
          Niniejsza polityka prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem z usług ELSEN Materace.
        </p>
        
        <h2 className="font-serif text-2xl mt-12 mb-6 text-foreground">1. Administrator danych</h2>
        <p className="text-muted-foreground font-normal leading-relaxed mb-8">
          Administratorem danych osobowych jest [NAZWA FIRMY], [ADRES], NIP [NIP].
        </p>
        
        <h2 className="font-serif text-2xl mt-12 mb-6 text-foreground">2. Cel zbierania danych</h2>
        <p className="text-muted-foreground font-normal leading-relaxed mb-8">
          Dane osobowe przetwarzane są w celu przygotowania wyceny, kontaktu z klientem oraz realizacji zamówienia. Podstawą prawną przetwarzania jest zgoda użytkownika (art. 6 ust. 1 lit. a RODO).
        </p>
        
        <h2 className="font-serif text-2xl mt-12 mb-6 text-foreground">3. Prawa użytkownika</h2>
        <p className="text-muted-foreground font-normal leading-relaxed mb-8">
          Użytkownikowi przysługuje prawo dostępu do treści swoich danych, ich poprawiania, usunięcia oraz wycofania zgody w dowolnym momencie.
        </p>
        
        <h2 className="font-serif text-2xl mt-12 mb-6 text-foreground">4. Okres przechowywania</h2>
        <p className="text-muted-foreground font-normal leading-relaxed mb-8">
          Dane przechowujemy przez 12 miesięcy od ostatniego kontaktu w celu zapewnienia płynności komunikacji, po czym są trwale usuwane.
        </p>
      </div>
    </div>
  );
}
