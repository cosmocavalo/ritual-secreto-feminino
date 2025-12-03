import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingCTAProps {
  visible: boolean;
  checkoutUrl: string;
}

const FloatingCTA = ({ visible, checkoutUrl }: FloatingCTAProps) => {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-md border-t border-border/50 transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
    >
      <div className="container max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-display font-semibold text-foreground">
            Pronta para transformar seu corpo?
          </p>
          <p className="text-sm text-muted-foreground">
            Garantia de 7 dias • Acesso imediato
          </p>
        </div>
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta flex items-center gap-2 text-base whitespace-nowrap"
        >
          <span>Quero Minha Vaga</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default FloatingCTA;
