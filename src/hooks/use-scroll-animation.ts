import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseScrollAnimationOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  duration?: number;
  start?: string;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
): RefObject<T> {
  const elementRef = useRef<T>(null);
  const { from = { opacity: 0, y: 50 }, to = { opacity: 1, y: 0 }, duration = 1, start = "top 80%" } = options;

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const element = elementRef.current;

    gsap.fromTo(
      element,
      from,
      {
        ...to,
        duration,
        scrollTrigger: {
          trigger: element,
          start: start,
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && (trigger.vars as any).trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [from, to, duration, start]);

  return elementRef;
}
