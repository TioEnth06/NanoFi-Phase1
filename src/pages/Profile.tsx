import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileOverview } from "@/components/profile/ProfileOverview";
import { WalletsSection } from "@/components/profile/WalletsSection";
import { MyIPNFTsSection } from "@/components/profile/MyIPNFTsSection";
import { LendingFundingSection } from "@/components/profile/LendingFundingSection";
import { PortfolioSection } from "@/components/profile/PortfolioSection";
import { SecuritySettingsSection } from "@/components/profile/SecuritySettingsSection";

type ProfileTab = 
  | "overview" 
  | "wallets" 
  | "ip-nfts" 
  | "lending-funding" 
  | "portfolio" 
  | "security";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview />;
      case "wallets":
        return <WalletsSection />;
      case "ip-nfts":
        return <MyIPNFTsSection />;
      case "lending-funding":
        return <LendingFundingSection />;
      case "portfolio":
        return <PortfolioSection />;
      case "security":
        return <SecuritySettingsSection />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activePage="overview" />
      <main className="p-4 md:p-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Sidebar */}
            <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
