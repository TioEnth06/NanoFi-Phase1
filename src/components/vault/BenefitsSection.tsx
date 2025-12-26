import { useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  "Fractional ownership enables broader investor access",
  "Liquidity for traditionally illiquid IP assets",
  "Transparent ownership and transaction history",
  "Automated royalty distribution via smart contracts",
  "Global marketplace access 24/7",
];

export const BenefitsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = itemsRef.current?.children;
    if (!items) return;

    const ctx = gsap.context(() => {
      // Animate title
      const titleElement = containerRef.current?.querySelector("h2");
      if (titleElement) {
        gsap.fromTo(
          titleElement,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
      }

      // Stagger animate items
      gsap.fromTo(
        Array.from(items),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="py-12">
      <h2 className="text-2xl font-bold text-foreground text-center mb-8">Benefits of IP-NFTs</h2>
      <div ref={itemsRef} className="flex flex-col items-center space-y-4">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
            <p className="text-muted-foreground">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
