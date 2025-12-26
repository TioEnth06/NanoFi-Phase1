import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: 1, title: "Step-01", description: "Upload your patent documentation and supporting materials" },
  { number: 2, title: "Step-02", description: "Provide detailed metadata about your innovation" },
  { number: 3, title: "Step-03", description: "Complete KYC verification for compliance" },
  { number: 4, title: "Step-04", description: "Wait for expert advisor review and valuation" },
  { number: 5, title: "Step-05", description: "Mint your IP-NFT and list on the marketplace" },
];

export const TokenizeSteps = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Animate container
      gsap.fromTo(
        container,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
            onEnter: () => {
              // Trigger step animations when container enters viewport
              steps.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleSteps((prev) => [...prev, index]);
                }, index * 200);
              });
            },
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative rounded-2xl overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/bg-s.webp)' }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full pr-0">
        {/* Image section - Above on mobile/tablet, Left on desktop */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[300px] lg:min-h-[400px] order-1 lg:order-1 opacity-0">
          <div className="w-full max-w-md">
            <div className="bg-slate-700 rounded-t-xl p-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-b-xl">
              <div className="bg-background/10 rounded-lg p-4 space-y-2">
                <div className="h-3 bg-primary-foreground/20 rounded w-3/4" />
                <div className="h-3 bg-primary-foreground/10 rounded w-1/2" />
                <div className="h-8 bg-accent/30 rounded mt-4" />
              </div>
            </div>
            <div className="h-4 bg-slate-600 rounded-b-xl mx-8" />
          </div>
        </div>

        {/* Steps section - Below on mobile/tablet, Right on desktop */}
        <div className="w-full lg:w-96 p-4 m-4 flex flex-col justify-center items-center order-2 lg:order-2 rounded-xl backdrop-blur-xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <h2 className="text-2xl font-bold text-primary-foreground mb-6 text-center">
            How to Tokenize<br />Your Patent
          </h2>
          
          <div className="space-y-4 mb-6 w-full">
            {steps.map((step, index) => {
              const isVisible = visibleSteps.includes(index);
              return (
                <div
                  key={index}
                  className={`flex gap-3 relative transition-all duration-500 ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-4'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 200}ms`,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isVisible 
                          ? 'scale-100 ring-2 ring-accent/50' 
                          : 'scale-0'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 200 + 100}ms`,
                        animation: isVisible ? 'pulse 2s infinite' : 'none'
                      }}
                    >
                      <span className="text-xs font-bold text-primary-foreground">{step.number}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div 
                        className={`w-0.5 min-h-[3rem] mt-2 transition-all duration-500 ${
                          isVisible 
                            ? 'h-full opacity-100' 
                            : 'h-0 opacity-0'
                        }`}
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          transitionDelay: `${index * 200 + 300}ms`
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p 
                      className={`text-xs text-primary-foreground/70 mb-0.5 transition-all duration-300 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 200 + 150}ms` }}
                    >
                      {step.title}
                    </p>
                    <p 
                      className={`text-sm text-primary-foreground/90 transition-all duration-300 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 200 + 200}ms` }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2">
            <FileUp className="w-4 h-4" />
            Tokenize Patent
          </Button>
        </div>
      </div>
    </div>
  );
};
