import { useEffect, useRef } from "react";
import { Wallet, Hand, Coins, TrendingUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const portfolioStats = [
    {
      label: "Total IP-NFT Value",
      value: "$1,200,000",
      icon: Wallet,
    },
    {
      label: "Total Borrowed",
      value: "$250,000",
      icon: Hand,
    },
    {
      label: "Active Staking",
      value: "$180,000",
      icon: Coins,
    },
    {
      label: "Yield Earned",
      value: "$32,400",
      icon: TrendingUp,
    },
  ];

  useEffect(() => {
    const stats = statsRef.current?.children;
    if (!stats) return;

    const ctx = gsap.context(() => {
      // Animate title
      const titleElement = containerRef.current?.querySelector('h1');
      if (titleElement) {
        gsap.fromTo(
          titleElement,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
      }

      // Stagger animate stats
      gsap.fromTo(
        Array.from(stats),
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
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
    <div ref={containerRef} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Portfolio Overview</h1>
        <p className="text-muted-foreground mt-1">View your complete portfolio summary</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

