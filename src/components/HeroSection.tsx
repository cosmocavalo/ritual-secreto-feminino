import { Play } from "lucide-react";

interface HeroSectionProps {
  onVideoStart: () => void;
  isPlaying: boolean;
}

const HeroSection = ({ onVideoStart, isPlaying }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-secondary/30">
      <div className="container max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Método exclusivo para mulheres
        </div>

        {/* Headline */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          O Ritual Secreto que{" "}
          <span className="text-gradient">Destranca</span> o Metabolismo{" "}
          <span className="text-gradient">Feminino</span>
        </h1>

        {/* Subheadline */}
        <p className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Descubra como milhares de mulheres estão eliminando até 7kg em 21 dias com um simples tônico matinal — sem dietas restritivas, sem academia.
        </p>

        {/* Video Container */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="video-container max-w-3xl mx-auto">
            {!isPlaying ? (
              <button
                onClick={onVideoStart}
                className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/5 hover:bg-foreground/10 transition-colors group"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-full flex items-center justify-center shadow-cta group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground ml-1" fill="currentColor" />
                </div>
                <span className="mt-4 text-foreground font-medium text-sm sm:text-base">
                  Clique para assistir o vídeo
                </span>
              </button>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-foreground/5">
                <div className="text-center p-8">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Carregando vídeo...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% Natural
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Sem efeitos colaterais
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Garantia de 7 dias
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
