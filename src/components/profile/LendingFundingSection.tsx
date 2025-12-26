import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LendingFundingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = Array.from(containerRef.current?.querySelectorAll('.bg-card') || []);
    if (!cards.length) return;

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
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
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
    <div ref={containerRef} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Lending & Funding Activity</h1>
        <p className="text-muted-foreground mt-1">Track your loan and funding activities</p>
      </div>

      {/* Patent-Backed Lending */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Lending Activity</h3>
        <div className="space-y-4">
          <div className="border border-border rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">IP-NFT Used</span>
                <span className="text-sm font-medium text-foreground">Patent ABC</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Loan Amount</span>
                <span className="text-sm font-semibold text-foreground">$50,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Interest</span>
                <span className="text-sm font-medium text-foreground">8% APY</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">LTV</span>
                <span className="text-sm font-medium text-foreground">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4 gap-2">
              <Eye className="w-4 h-4" />
              View Loan Details
            </Button>
          </div>
        </div>
      </div>

      {/* Governance & Funding Proposals */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Funding Proposals</h3>
        <div className="space-y-4">
          <div className="border border-border rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Proposal ID</span>
                <span className="text-sm font-mono text-foreground">#P-021</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">IP-NFT</span>
                <span className="text-sm font-medium text-foreground">Nano Coating Tech</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="secondary">Voting</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Approved Budget</span>
                <span className="text-sm font-semibold text-foreground">$120,000</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4 gap-2">
              <FileText className="w-4 h-4" />
              View Proposal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

