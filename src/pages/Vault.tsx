import { Navbar } from "@/components/Navbar";
import { VaultHero } from "@/components/vault/VaultHero";
import { VaultStats } from "@/components/vault/VaultStats";
import { PatentTable } from "@/components/vault/PatentTable";
import { TokenizeSteps } from "@/components/vault/TokenizeSteps";
import { BenefitsSection } from "@/components/vault/BenefitsSection";
import { Footer } from "@/components/Footer";

const Vault = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar activePage="vault" />
      <main className="p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <VaultHero />
          <VaultStats />
          <PatentTable />
          <TokenizeSteps />
          <BenefitsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vault;
