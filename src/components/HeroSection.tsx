import { ArrowRight, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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

const VIDEO_ID = "aa9-AJQ14Yk";

const HeroSection = ({ onVideoStart, isPlaying, isContentUnlocked, checkoutUrl }: HeroSectionProps) => {
  const [progress, setProgress] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const trackInitiateCheckout = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout');
    }
  };

  // Progress bar update - faster at start, syncs with video after 50%
  useEffect(() => {
    if (!isPlaying || !playerReady) return;

    const interval = setInterval(() => {
      if (playerRef.current) {
        try {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          
          if (duration > 0) {
            const normalizedTime = currentTime / duration; // 0 to 1
            
            let visualProgress: number;
            
            if (normalizedTime <= 0.5) {
              // First half of video: bar advances quickly to 50%
              // Map 0-0.5 video time to 0-0.5 bar progress with acceleration
              visualProgress = normalizedTime * 1.0; // reaches 50% when video is at 50%
            } else {
              // Second half: sync perfectly with video - map 0.5-1.0 video to 0.5-1.0 bar
              visualProgress = normalizedTime;
            }
            
            const progressPercent = Math.min(visualProgress * 100, 100);
            setProgress(progressPercent);
          }
        } catch (error) {
          console.log("Could not get video progress");
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, playerReady]);

  const onPlayerReady = (event: YouTubeEvent) => {
    try {
      playerRef.current = event.target;
      setPlayerReady(true);
    } catch (error) {
      console.log("Player ready error:", error);
    }
  };

  const onPlayerStateChange = (event: YouTubeEvent) => {
    try {
      // Video started playing (state 1)
      if (event.data === 1 && !hasStarted) {
        setHasStarted(true);
        onVideoStart();
      }
    } catch (error) {
      console.log("Player state change error:", error);
    }
  };

  const onPlayerError = (event: YouTubeEvent) => {
    console.log("YouTube player error:", event.data);
  };

  const handlePlayerClick = () => {
    if (!hasStarted) {
      try {
        if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
      } catch (error) {
        console.log("Play video error:", error);
      }
    }
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      fs: 0,
      iv_load_policy: 3,
      disablekb: 1,
      playsinline: 1,
      mute: 0,
    },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-0 py-12 bg-gradient-to-b from-background to-secondary/30">
      <div className="w-full max-w-5xl mx-auto text-center px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Vídeo grátis, irá sair do ar em breve
        </div>

        {/* Headline */}
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Veja o vídeo curto abaixo e descubra o{" "}
          <span className="text-gradient">tônico secreto</span> que destranca o{" "}
          <span className="text-gradient">metabolismo feminino</span>
        </h1>

      </div>

      {/* Video Container - Full Width */}
      <div className="w-full animate-fade-in relative" style={{ animationDelay: '0.3s' }}>
        <div className="video-container w-full rounded-none">
          <YouTube
            videoId={VIDEO_ID}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
            onError={onPlayerError}
            className="absolute inset-0 w-full h-full"
            iframeClassName="w-full h-full"
          />
          
          {/* Click to Play Overlay - Black background before start */}
          {!hasStarted && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black z-10 cursor-pointer animate-fade-in"
              onClick={handlePlayerClick}
            >
              <div className="text-center">
                <div className="bg-primary rounded-full p-6 mb-4 mx-auto w-fit animate-pulse shadow-elegant">
                  <Play className="w-12 h-12 text-primary-foreground" fill="currentColor" />
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 text-white">
                  Clique no botão rosa, e descubra o segredo
                </h3>
                <p className="text-sm sm:text-base text-white/80">
                  Não estará disponível por muito tempo.
                </p>
              </div>
            </div>
          )}
          
          {/* Invisible overlay to prevent YouTube UI interaction after video starts */}
          {hasStarted && (
            <div className="absolute inset-0 z-10 cursor-default" />
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
