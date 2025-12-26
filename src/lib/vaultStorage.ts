export interface VaultApplication {
  id: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  submittedBy: string;
  formData: any;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

const STORAGE_KEY = "vault_applications";

export function saveVaultApplication(application: Omit<VaultApplication, "id" | "submittedAt" | "status">): string {
  const applications = getVaultApplications();
  const id = `vault-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const newApplication: VaultApplication = {
    ...application,
    id,
    submittedAt: new Date().toISOString(),
    status: "pending",
  };
  
  applications.push(newApplication);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  return id;
}

export function getVaultApplications(): VaultApplication[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getPendingVaultApplications(): VaultApplication[] {
  return getVaultApplications().filter(app => app.status === "pending");
}

export function updateVaultApplicationStatus(
  id: string,
  status: "approved" | "rejected",
  reviewedBy: string,
  reviewNotes?: string
): boolean {
  const applications = getVaultApplications();
  const index = applications.findIndex(app => app.id === id);
  
  if (index === -1) return false;
  
  applications[index] = {
    ...applications[index],
    status,
    reviewedBy,
    reviewedAt: new Date().toISOString(),
    reviewNotes,
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  return true;
}

export function getVaultApplicationById(id: string): VaultApplication | null {
  const applications = getVaultApplications();
  return applications.find(app => app.id === id) || null;
}

export function initializeDummyData(): void {
  const existing = getVaultApplications();
  if (existing.length > 0) {
    return; // Don't initialize if data already exists
  }

  const now = new Date();
  const dummyApplications: VaultApplication[] = [
    // Pending applications
    {
      id: "vault-001",
      submittedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      status: "pending",
      submittedBy: "john.doe@nanofi.com",
      formData: {
        inventor: {
          fullName: "John Doe",
          email: "john.doe@nanofi.com",
          affiliation: "Tech Innovations Inc.",
          phoneNumber: "+1-555-0101",
        },
        patent: {
          patentTitle: "Advanced Quantum Computing Algorithm",
          patentNumber: "US-2024-001234",
          filingDate: "2024-01-15",
          patentOffice: "USPTO",
          description: "A novel quantum computing algorithm that improves computational efficiency by 300%",
        },
        valuation: {
          proposedValuation: "$2,500,000",
          valuationMethod: "Income Approach",
          justification: "Based on projected revenue streams and market analysis",
        },
      },
    },
    {
      id: "vault-002",
      submittedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      status: "pending",
      submittedBy: "sarah.smith@nanofi.com",
      formData: {
        inventor: {
          fullName: "Sarah Smith",
          email: "sarah.smith@nanofi.com",
          affiliation: "BioMed Research Labs",
          phoneNumber: "+1-555-0102",
        },
        patent: {
          patentTitle: "Biodegradable Nanofiber Composite Material",
          patentNumber: "US-2024-002456",
          filingDate: "2024-02-20",
          patentOffice: "USPTO",
          description: "Environmentally friendly composite material with superior mechanical properties",
        },
        valuation: {
          proposedValuation: "$1,800,000",
          valuationMethod: "Market Approach",
          justification: "Comparable transactions in the materials science sector",
        },
      },
    },
    {
      id: "vault-003",
      submittedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      status: "pending",
      submittedBy: "michael.chen@nanofi.com",
      formData: {
        inventor: {
          fullName: "Michael Chen",
          email: "michael.chen@nanofi.com",
          affiliation: "Energy Solutions Corp",
          phoneNumber: "+1-555-0103",
        },
        patent: {
          patentTitle: "Solar Panel Efficiency Enhancement Technology",
          patentNumber: "US-2024-003789",
          filingDate: "2024-03-10",
          patentOffice: "USPTO",
          description: "Innovative coating technology that increases solar panel efficiency by 45%",
        },
        valuation: {
          proposedValuation: "$3,200,000",
          valuationMethod: "Cost Approach",
          justification: "Based on R&D investment and development costs",
        },
      },
    },
    // Approved/Active applications
    {
      id: "vault-004",
      submittedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      status: "approved",
      submittedBy: "emma.wilson@nanofi.com",
      reviewedBy: "spv@nanofi.com",
      reviewedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      reviewNotes: "Application approved by SPV reviewer",
      formData: {
        inventor: {
          fullName: "Emma Wilson",
          email: "emma.wilson@nanofi.com",
          affiliation: "Advanced Materials Ltd",
          phoneNumber: "+1-555-0104",
        },
        patent: {
          patentTitle: "Graphene-Based Water Filtration System",
          patentNumber: "US-2024-004567",
          filingDate: "2024-01-05",
          patentOffice: "USPTO",
          description: "Revolutionary water filtration system using graphene membranes",
        },
        valuation: {
          proposedValuation: "$2,100,000",
          valuationMethod: "Income Approach",
          justification: "Strong market demand and scalable technology",
        },
      },
    },
    {
      id: "vault-005",
      submittedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      status: "approved",
      submittedBy: "david.brown@nanofi.com",
      reviewedBy: "spv@nanofi.com",
      reviewedAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
      reviewNotes: "Application approved by SPV reviewer",
      formData: {
        inventor: {
          fullName: "David Brown",
          email: "david.brown@nanofi.com",
          affiliation: "NeuralTech Innovations",
          phoneNumber: "+1-555-0105",
        },
        patent: {
          patentTitle: "AI-Powered Medical Diagnostic Tool",
          patentNumber: "US-2024-005123",
          filingDate: "2024-02-12",
          patentOffice: "USPTO",
          description: "Machine learning system for early disease detection",
        },
        valuation: {
          proposedValuation: "$4,500,000",
          valuationMethod: "Market Approach",
          justification: "High-value medical technology with significant market potential",
        },
      },
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyApplications));
}


