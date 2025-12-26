import { cn } from "@/lib/utils";
import { 
  User, 
  Wallet, 
  FileText, 
  Hand, 
  PieChart, 
  Shield,
  LayoutDashboard
} from "lucide-react";

type ProfileTab = 
  | "overview" 
  | "wallets" 
  | "ip-nfts" 
  | "lending-funding" 
  | "portfolio" 
  | "security";

interface ProfileSidebarProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

const menuItems = [
  { id: "overview" as ProfileTab, label: "Profile Overview", icon: User },
  { id: "wallets" as ProfileTab, label: "Wallets", icon: Wallet },
  { id: "ip-nfts" as ProfileTab, label: "My IP-NFTs", icon: FileText },
  { id: "lending-funding" as ProfileTab, label: "Lending & Funding", icon: Hand },
  { id: "portfolio" as ProfileTab, label: "Portfolio", icon: PieChart },
  { id: "security" as ProfileTab, label: "Security & Setting", icon: Shield },
];

export function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="bg-card rounded-xl border border-border p-4 md:sticky md:top-24">
        <div className="mb-4 hidden md:block">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" />
            Profile Menu
          </h2>
        </div>
        <nav className="flex md:flex-col gap-1 overflow-x-auto scrollbar-hide md:overflow-x-visible">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  activeTab === item.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

