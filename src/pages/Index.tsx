import { useContentTimer } from "@/hooks/useContentTimer";
import { useBenefitsVisibility } from "@/hooks/useBenefitsVisibility";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import FloatingCTA from "@/components/FloatingCTA";

import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const CHECKOUT_URL = "https://pay.cakto.com.br/xyxyod5_668610";
const UNLOCK_SECONDS = 275; // 4 minutes and 35 seconds

const Index = () => {
  const {
    isVideoPlaying,
    secondsRemaining,
    isContentUnlocked,
    showTimer,
    startVideo,
  } = useContentTimer({ unlockSeconds: UNLOCK_SECONDS });

  const hasSeenBenefits = useBenefitsVisibility();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero with VSL */}
      <HeroSection 
        onVideoStart={startVideo} 
        isPlaying={isVideoPlaying}
        isContentUnlocked={isContentUnlocked}
        checkoutUrl={CHECKOUT_URL}
      />


      {/* Hidden content - revealed after timer */}
      <div
        className={cn(
          "transition-all duration-700",
          isContentUnlocked
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none h-0 overflow-hidden"
        )}
      >
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection checkoutUrl={CHECKOUT_URL} />
        <FAQSection />
        <Footer />
      </div>

      {/* Floating CTA - appears after viewing benefits section */}
      <FloatingCTA visible={hasSeenBenefits} checkoutUrl={CHECKOUT_URL} />
    </main>
  );
};

export default Index;
