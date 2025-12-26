import { Search, SlidersHorizontal, TrendingUp, CheckCircle, Clock, XCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PatentStatus = "minted" | "approved" | "pending" | "rejected";

interface Patent {
  no: number;
  id: string;
  title: string;
  field: string;
  status: PatentStatus;
  valuation: string;
  mintDate: string;
  time: string;
}

const patents: Patent[] = [
  { no: 1, id: "PAT-001", title: "Quantum Computing...", field: "Quantum Computing", status: "minted", valuation: "$450,000", mintDate: "Buy", time: "1h ago" },
  { no: 2, id: "PAT-001", title: "AI-Powered Drug Dis...", field: "Biotechnology", status: "approved", valuation: "$450,000", mintDate: "Buy", time: "1h ago" },
  { no: 3, id: "PAT-001", title: "Green Energy Storag...", field: "Clean Energy", status: "pending", valuation: "$450,000", mintDate: "Buy", time: "1h ago" },
  { no: 4, id: "PAT-001", title: "Neural Interface Tec...", field: "Neuroscience", status: "minted", valuation: "$450,000", mintDate: "Buy", time: "1h ago" },
  { no: 5, id: "PAT-001", title: "0x3b4...c9e", field: "0xBf2...a4f", status: "rejected", valuation: "$450,000", mintDate: "Buy", time: "1h ago" },
];

const statusConfig = {
  minted: { label: "Minted", icon: CheckCircle, className: "bg-success/10 text-success border-success/20" },
  approved: { label: "Approved", icon: CheckCircle, className: "bg-accent/10 text-accent border-accent/20" },
  pending: { label: "Pending", icon: Clock, className: "bg-warning/10 text-warning border-warning/20" },
  rejected: { label: "Rejected", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const StatusBadge = ({ status }: { status: PatentStatus }) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border", config.className)}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};

export const PatentTable = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const rows = tbodyRef.current?.children;
    if (!rows) return;

    const ctx = gsap.context(() => {
      // Animate container
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Stagger animate rows
      gsap.fromTo(
        Array.from(rows),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tbodyRef.current,
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
    <div ref={containerRef} className="stat-card">
      {/* Search and Filter */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Patent by Title, ID or Description"
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-muted rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-muted-foreground"
          />
        </div>
        <Button variant="outline" className="gap-2 ml-auto">
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Table Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">My Patent</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          Today 5 May 2026
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">No</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">ID</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Patent Title</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Field</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Valuation</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Mint Date</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody ref={tbodyRef}>
            {patents.map((patent, index) => (
              <tr
                key={index}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="py-4 px-4 text-sm text-muted-foreground">{patent.no}.</td>
                <td className="py-4 px-4 text-sm font-medium text-foreground">{patent.id}</td>
                <td className="py-4 px-4 text-sm text-foreground">{patent.title}</td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{patent.field}</td>
                <td className="py-4 px-4">
                  <StatusBadge status={patent.status} />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    <TrendingUp className="w-4 h-4 text-success" />
                    {patent.valuation}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button className="text-sm text-accent hover:text-accent/80 font-medium">
                    {patent.mintDate}
                  </button>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{patent.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
