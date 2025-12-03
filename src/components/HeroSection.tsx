import { Play, Volume2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface HeroSectionProps {
  onVideoStart: () => void;
  isPlaying: boolean;
}

const VIDEO_DURATION_SECONDS = 300; // 5 minutes - adjust to actual video length

const HeroSection = ({ onVideoStart, isPlaying }: HeroSectionProps) => {
  const [showVolumeWarning, setShowVolumeWarning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Check audio volume (this uses a workaround since we can't directly access device volume)
  const checkVolumeAndStart = useCallback(async () => {
    try {
      // Create a temporary audio context to check if audio is available
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Try to get audio output info - if user has volume very low, we show warning
      // Note: We can't directly read device volume, so we check if audio is muted/very low
      // by attempting to use the Audio API
      const testAudio = new Audio();
      testAudio.volume = 0.5;
      
      // Check if device likely has low volume using navigator.mediaDevices
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasAudioOutput = devices.some(device => device.kind === 'audiooutput');
        
        if (hasAudioOutput) {
          // Show volume warning on first play - user should verify their volume
          setShowVolumeWarning(true);
          audioContext.close();
          return;
        }
      }
      
      audioContext.close();
      startVideo();
    } catch (error) {
      // If audio context fails, show volume warning anyway
      setShowVolumeWarning(true);
    }
  }, []);

  const startVideo = () => {
    setShowVolumeWarning(false);
    onVideoStart();
  };

  const dismissWarningAndPlay = () => {
    startVideo();
  };

  // Progress bar effect - starts faster, then slows down
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setElapsedTime(prev => {
        const newTime = prev + 1;
        
        // Easing function: starts fast, slows down
        // Uses an ease-out curve that eventually catches up to real time
        const normalizedTime = newTime / VIDEO_DURATION_SECONDS;
        const easedProgress = 1 - Math.pow(1 - normalizedTime, 0.7);
        const progressPercent = Math.min(easedProgress * 100, 100);
        
        setProgress(progressPercent);
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-0 py-12 bg-gradient-to-b from-background to-secondary/30">
      <div className="w-full max-w-5xl mx-auto text-center px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Método exclusivo para mulheres
        </div>

        {/* Headline - smaller */}
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          O Ritual Secreto que{" "}
          <span className="text-gradient">Destranca</span> o Metabolismo{" "}
          <span className="text-gradient">Feminino</span>
        </h1>

        {/* Subheadline - smaller */}
        <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Descubra como milhares de mulheres estão eliminando até 7kg em 21 dias com um simples tônico matinal — sem dietas restritivas, sem academia.
        </p>
      </div>

      {/* Video Container - Full Width */}
      <div className="w-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="video-container w-full rounded-none">
          {showVolumeWarning ? (
            <div className="volume-warning">
              <Volume2 className="w-16 h-16 mb-4 text-primary animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-2">
                Aumente o volume!
              </h3>
              <p className="text-sm sm:text-base mb-6 text-center max-w-md px-4 opacity-90">
                Para descobrir o segredo, certifique-se de que o volume do seu dispositivo está acima de 50%
              </p>
              <button
                onClick={dismissWarningAndPlay}
                className="btn-cta px-8 py-3"
              >
                <span>Meu volume está alto, continuar</span>
              </button>
            </div>
          ) : !isPlaying ? (
            <button
              onClick={checkVolumeAndStart}
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

        {/* Progress Bar */}
        {isPlaying && (
          <div className="w-full bg-muted h-1.5 mt-0">
            <div 
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Trust indicators */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
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
    </section>
  );
};

export default HeroSection;
