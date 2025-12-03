import { useState, useEffect } from "react";

export const useBenefitsVisibility = () => {
  const [hasSeen, setHasSeen] = useState(false);

  useEffect(() => {
    const benefitsSection = document.getElementById("benefits-section");
    if (!benefitsSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(benefitsSection);

    return () => observer.disconnect();
  }, []);

  return hasSeen;
};
