import { useState, useEffect, useCallback } from "react";

interface UseContentTimerProps {
  unlockSeconds: number;
}

export const useContentTimer = ({ unlockSeconds }: UseContentTimerProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(unlockSeconds);
  const [isContentUnlocked, setIsContentUnlocked] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const startVideo = useCallback(() => {
    setIsVideoPlaying(true);
    setShowTimer(true);
  }, []);

  useEffect(() => {
    if (!isVideoPlaying || isContentUnlocked) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsContentUnlocked(true);
          setShowTimer(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVideoPlaying, isContentUnlocked]);

  return {
    isVideoPlaying,
    secondsRemaining,
    isContentUnlocked,
    showTimer,
    startVideo,
  };
};
