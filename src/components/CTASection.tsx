import { Shield, ArrowRight } from "lucide-react";

interface CTASectionProps {
  checkoutUrl: string;
}

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

const CTASection = ({ checkoutUrl }: CTASectionProps) => {
  const trackInitiateCheckout = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout');
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container max-w-3xl mx-auto text-center">
        {/* Urgency badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Vagas limitadas — Preço promocional por tempo limitado
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
          Comece Sua Transformação{" "}
          <span className="text-gradient">Hoje Mesmo</span>
        </h2>

        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          Acesse agora o Guia do Ritual Secreto e descubra como ativar o modo queima do seu corpo de forma natural e definitiva.
        </p>

        {/* CTA Button */}
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackInitiateCheckout}
          className="btn-cta inline-flex items-center gap-3 text-lg animate-pulse-soft"
        >
          <span>Garanta Minha Vaga Agora</span>
          <ArrowRight className="w-5 h-5" />
        </a>

        {/* Guarantee */}
        <div className="mt-10 inline-flex items-center gap-3 bg-card rounded-xl px-6 py-4 border border-border/50">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">Garantia de 7 Dias</p>
            <p className="text-sm text-muted-foreground">
              Satisfação garantida ou seu dinheiro de volta
            </p>
          </div>
        </div>

        {/* Payment methods */}
        <p className="mt-8 text-sm text-muted-foreground">
          Pagamento 100% seguro • PIX, Cartão ou Boleto
        </p>
      </div>
    </section>
  );
};

export default CTASection;
