import { ArrowRight, Volume2 } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import YouTube, { YouTubePlayer, YouTubeEvent } from "react-youtube";

interface HeroSectionProps {
  onVideoStart: () => void;
  isPlaying: boolean;
  isContentUnlocked: boolean;
  checkoutUrl: string;
}

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

const VIDEO_ID = "NBmJHhb1Dxw";

const HeroSection = ({ onVideoStart, isPlaying, isContentUnlocked, checkoutUrl }: HeroSectionProps) => {
  const [showVolumeWarning, setShowVolumeWarning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const volumeCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const trackInitiateCheckout = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout');
    }
  };

  // Check volume periodically
  const checkVolume = useCallback(() => {
    if (playerRef.current) {
      try {
        const volume = playerRef.current.getVolume();
        const isMuted = playerRef.current.isMuted();
        
        if (volume < 50 || isMuted) {
          setShowVolumeWarning(true);
          
          // Hide warning after 5 seconds
          if (warningTimeoutRef.current) {
            clearTimeout(warningTimeoutRef.current);
          }
          warningTimeoutRef.current = setTimeout(() => {
            setShowVolumeWarning(false);
          }, 5000);
        } else {
          setShowVolumeWarning(false);
          if (warningTimeoutRef.current) {
            clearTimeout(warningTimeoutRef.current);
          }
        }
      } catch (error) {
        console.log("Could not check volume");
      }
    }
  }, []);

  // Start volume checking when video plays
  useEffect(() => {
    if (isPlaying && playerReady) {
      checkVolume();
      volumeCheckIntervalRef.current = setInterval(checkVolume, 10000);
    }

    return () => {
      if (volumeCheckIntervalRef.current) {
        clearInterval(volumeCheckIntervalRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, [isPlaying, playerReady, checkVolume]);

  // Progress bar update
  useEffect(() => {
    if (!isPlaying || !playerReady) return;

    const interval = setInterval(() => {
      if (playerRef.current) {
        try {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          
          if (duration > 0) {
            const normalizedTime = currentTime / duration;
            const easedProgress = 1 - Math.pow(1 - normalizedTime, 0.7);
            const progressPercent = Math.min(easedProgress * 100, 100);
            setProgress(progressPercent);
          }
        } catch (error) {
          console.log("Could not get video progress");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, playerReady]);

  const onPlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    setPlayerReady(true);
    event.target.playVideo();
    onVideoStart();
  };

  const onPlayerStateChange = (event: YouTubeEvent) => {
    if (event.data === 1) {
      setTimeout(checkVolume, 1000);
    }
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      fs: 0,
      iv_load_policy: 3,
      disablekb: 1,
      playsinline: 1,
    },
  };

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
      <div className="w-full animate-fade-in relative" style={{ animationDelay: '0.3s' }}>
        <div className="video-container w-full rounded-none">
          <YouTube
            videoId={VIDEO_ID}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
            className="absolute inset-0 w-full h-full"
            iframeClassName="w-full h-full"
          />
          
          {/* Volume Warning Popup */}
          {showVolumeWarning && (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/80 z-10 animate-fade-in">
              <div className="bg-background rounded-2xl p-8 max-w-md mx-4 text-center shadow-elegant">
                <Volume2 className="w-16 h-16 mb-4 text-primary animate-pulse mx-auto" />
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 text-foreground">
                  Volume muito baixo!
                </h3>
                <p className="text-sm sm:text-base mb-4 text-muted-foreground">
                  Aumente o volume do seu dispositivo acima de 50% para entender o segredo completo do ritual.
                </p>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Aguardando aumento de volume...</span>
                </div>
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

      {/* CTA Button below VSL - appears after unlock */}
      {isContentUnlocked && (
        <div className="mt-8 px-4 animate-fade-in">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackInitiateCheckout}
            className="btn-cta flex items-center justify-center gap-2 text-lg mx-auto max-w-md"
          >
            <span>Quero Minha Vaga Agora</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      )}

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
