import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, CheckCircle2, Plus, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WalletsSection() {
  const { toast } = useToast();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopy = (address: string, label: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    toast({
      title: "Copied!",
      description: `${label} address copied to clipboard`,
    });
    setTimeout(() => setCopiedAddress(null), 2000);
  };

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
        <h1 className="text-2xl font-bold text-foreground">Wallet Management</h1>
        <p className="text-muted-foreground mt-1">Manage your connected wallets and addresses</p>
      </div>

      {/* NanoFi Generated Wallet */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">NanoFi Generated Wallet</h3>
        <div className="space-y-4 p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Wallet Type</span>
            <span className="text-sm font-medium text-foreground">NanoFi Generated Wallet</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Network</span>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 397.7 311.7" className="w-5 h-5">
                <linearGradient id="solana-gradient" x1="360.879" y1="351.455" x2="141.853" y2="69.294" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#00FFA3" />
                  <stop offset="1" stopColor="#DC1FFF" />
                </linearGradient>
                <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="url(#solana-gradient)" />
                <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" fill="url(#solana-gradient)" />
                <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="url(#solana-gradient)" />
              </svg>
              <span className="text-sm font-medium text-foreground">Solana</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Address</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-foreground truncate max-w-[120px] sm:max-w-none">9xA...f2K</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => handleCopy("9xABCDEF1234567890f2K", "NanoFi Wallet")}
              >
                {copiedAddress === "9xABCDEF1234567890f2K" ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge className="bg-success/10 text-success border-success/20">
              Active (Default)
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-6 justify-end">
          <Button variant="outline" size="sm" className="gap-2">
            <Copy className="w-4 h-4" />
            Copy Address
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Backup Wallet
          </Button>
          <Button variant="outline" size="sm">Set Default</Button>
        </div>
      </div>

      {/* Connected External Wallets */}
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold text-foreground">Connected Wallets</h3>
          <Button size="sm" className="gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Connect New Wallet
          </Button>
        </div>

        <div className="space-y-4">
          {/* Phantom Wallet */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Phantom Wallet</h4>
              <Badge variant="secondary">Connected</Badge>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm text-muted-foreground">Address</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-foreground truncate max-w-[120px] sm:max-w-none">3hD...L8Q</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={() => handleCopy("3hD1234567890L8Q", "Phantom")}
                  >
                    {copiedAddress === "3hD1234567890L8Q" ? (
                      <CheckCircle2 className="w-3 h-3 text-success" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Connected</span>
                <span className="text-sm text-foreground">20/12/2024</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Set Default</Button>
              <Button variant="outline" size="sm" className="flex-1 gap-2 text-destructive hover:text-destructive">
                <X className="w-4 h-4" />
                Disconnect
              </Button>
            </div>
          </div>

          {/* Solflare Wallet */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Solflare Wallet</h4>
              <Badge variant="secondary">Connected</Badge>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm text-muted-foreground">Address</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-foreground truncate max-w-[120px] sm:max-w-none">7Rk...M2A</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={() => handleCopy("7Rk1234567890M2A", "Solflare")}
                  >
                    {copiedAddress === "7Rk1234567890M2A" ? (
                      <CheckCircle2 className="w-3 h-3 text-success" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Connected</span>
                <span className="text-sm text-foreground">18/12/2024</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Set Default</Button>
              <Button variant="outline" size="sm" className="flex-1 gap-2 text-destructive hover:text-destructive">
                <X className="w-4 h-4" />
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

