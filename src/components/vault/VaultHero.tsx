import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export const VaultHero = () => {
  const navigate = useNavigate();
  const heroRef = useScrollAnimation({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    start: "top 85%",
  });

  return (
    <div ref={heroRef} className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold text-foreground mb-1">Patent Vault</h1>
        <p className="text-muted-foreground text-sm">
          Manage, tokenize, and track your nanotechnology intellectual property portfolio
        </p>
      </div>
      <Button 
        className="gap-2 h-10 w-full md:w-auto" 
        style={{ backgroundColor: '#000000', color: '#ffffff' }}
        onClick={() => navigate("/vault/tokenize")}
      >
        <FileUp className="w-4 h-4" style={{ color: '#ffffff' }} />
        Tokenize Patent
      </Button>
    </div>
  );
};
