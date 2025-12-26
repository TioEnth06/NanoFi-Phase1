import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Hand, ShoppingCart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MyIPNFTsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ipNFTs = [
    {
      id: "#00123",
      title: "Nano Coating Technology",
      status: "Verified",
      valuation: "$250,000",
      usage: "Collateral",
    },
    {
      id: "#00124",
      title: "Quantum Dot Display",
      status: "Verified",
      valuation: "$180,000",
      usage: "Marketplace",
    },
    {
      id: "#00125",
      title: "Graphene Battery Tech",
      status: "Pending",
      valuation: "$320,000",
      usage: "Idle",
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

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

      // Stagger animate cards
      gsap.fromTo(
        Array.from(cards),
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
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
        <h1 className="text-2xl font-bold text-foreground">My IP-NFTs</h1>
        <p className="text-muted-foreground mt-1">Manage your tokenized intellectual property</p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 gap-4">
        {ipNFTs.map((nft) => (
          <div key={nft.id} className="bg-card rounded-xl border border-border p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{nft.title}</h3>
                  <Badge 
                    variant={nft.status === "Verified" ? "default" : "secondary"}
                    className={nft.status === "Verified" ? "bg-success/10 text-success border-success/20" : ""}
                  >
                    {nft.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Token ID</span>
                    <span className="font-mono text-foreground">{nft.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Valuation</span>
                    <span className="font-semibold text-foreground">{nft.valuation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Usage</span>
                    <Badge variant="outline">{nft.usage}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="w-4 h-4" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Hand className="w-4 h-4" />
                  Use as Collateral
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Marketplace
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

