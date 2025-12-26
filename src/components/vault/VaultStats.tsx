import { useEffect, useRef } from "react";
import { FileText } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "$45.M", label: "Total Patents" },
  { value: "$28.7M", label: "Minted IP-NFT" },
  { value: "$8.9M", label: "Pending Review" },
  { value: "$7.6M", label: "Total Value" },
];

export const VaultStats = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.children;
    if (!cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(cards),
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
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
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-xl p-5 bg-white text-black"
          style={{ 
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="w-10 h-10 rounded-lg bg-black/10 flex items-center justify-center mb-4">
            <FileText className="w-5 h-5 text-black" />
          </div>
          <p className="text-3xl font-bold mb-1 text-black">{stat.value}</p>
          <p className="text-sm text-black/80">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};
