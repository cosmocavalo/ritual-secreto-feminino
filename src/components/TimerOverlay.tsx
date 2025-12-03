import { cn } from "@/lib/utils";

interface TimerOverlayProps {
  seconds: number;
  visible: boolean;
}

const TimerOverlay = ({ seconds, visible }: TimerOverlayProps) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-end justify-center pb-32">
      <div className={cn(
        "bg-foreground/90 text-background px-6 py-3 rounded-full font-body text-sm font-medium transition-all duration-300",
        seconds <= 10 ? "animate-pulse" : ""
      )}>
        Conteúdo completo em {seconds}s...
      </div>
    </div>
  );
};

export default TimerOverlay;
