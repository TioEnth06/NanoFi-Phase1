import { z } from "zod";

// Email validation - comprehensive email format check
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .refine(
    (val) => {
      // Additional check for email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val);
    },
    {
      message: "Please enter a valid email address (e.g., user@example.com)",
    }
  );

// Phone number validation - supports international formats
export const phoneSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val || val.trim() === "") return true; // Optional field
      // Remove common formatting characters for validation
      const cleaned = val.replace(/[\s\-\(\)\.\+]/g, "");
      // Check if it contains only digits and has reasonable length (7-15 digits)
      const phoneRegex = /^[\d]{7,15}$/;
      return phoneRegex.test(cleaned);
    },
    {
      message: "Please enter a valid phone number (7-15 digits, formats like +1-555-123-4567 or (555) 123-4567)",
    }
  );

// Website/URL validation - supports various URL formats including LinkedIn
export const websiteSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val || val.trim() === "") return true; // Optional field
      const trimmed = val.trim();
      
      // Check if it's a valid URL format
      try {
        // If it doesn't start with http:// or https://, add https://
        const url = trimmed.startsWith("http://") || trimmed.startsWith("https://") 
          ? trimmed 
          : `https://${trimmed}`;
        
        const urlObj = new URL(url);
        
        // Validate it has a valid hostname
        if (!urlObj.hostname || urlObj.hostname.length < 3) {
          return false;
        }
        
        // Check for valid domain format (at least one dot or valid TLD)
        const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
        return domainRegex.test(urlObj.hostname) || 
               urlObj.hostname.includes("linkedin.com") ||
               urlObj.hostname.includes("github.com") ||
               urlObj.hostname.includes("institution");
      } catch {
        return false;
      }
    },
    {
      message: "Please enter a valid website URL (e.g., https://example.com or linkedin.com/in/username)",
    }
  );

// Combined validation schemas for form sections
export const inventorSchema = z.object({
  fullName: z.string().min(1, "Full name / Organization Name is required"),
  role: z.string().min(1, "Role is required. Please select a role."),
  email: emailSchema,
  phone: phoneSchema,
  country: z.string().min(1, "Country of Origin is required. Please select a country."),
  website: websiteSchema,
});

export type InventorFormData = z.infer<typeof inventorSchema>;

// Loan form validation schemas
export const borrowerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  role: z.string().min(1, "Role is required"),
  email: emailSchema,
  phone: phoneSchema,
  country: z.string().min(1, "Country/Jurisdiction is required"),
});

export type BorrowerFormData = z.infer<typeof borrowerSchema>;

export const collateralSchema = z.object({
  ipNftId: z.string().min(1, "Please select an IP-NFT"),
  patentTitle: z.string(),
  valuationSource: z.string().min(1, "Valuation source is required"),
  verifiedValue: z.string().min(1, "Verified collateral value is required"),
});

export type CollateralFormData = z.infer<typeof collateralSchema>;

export const loanRequestSchema = z.object({
  requestedAmount: z.string().min(1, "Requested loan amount is required"),
  loanType: z.string().min(1, "Loan type is required"),
  loanDuration: z.string().min(1, "Loan duration is required"),
  interestModel: z.string().min(1, "Interest model is required"),
  purpose: z.string().min(1, "Purpose of loan is required"),
  fundingProposal: z.any().nullable(),
});

export type LoanRequestFormData = z.infer<typeof loanRequestSchema>;

export const riskComplianceSchema = z.object({
  existingObligations: z.string().min(1, "Please disclose existing obligations"),
  coOwnership: z.string().min(1, "Co-ownership confirmation is required"),
  patentStatus: z.string().min(1, "Patent status is required"),
  materialRisks: z.string().optional(),
  ipLegalDocs: z.any().nullable(),
});

export type RiskComplianceFormData = z.infer<typeof riskComplianceSchema>;

export const ltvRequestSchema = z.object({
  preferredLTV: z.string().min(1, "Preferred LTV is required"),
  ltvRiskInfo: z.string().min(1, "LTV risk information is required"),
  collateralValue: z.string().min(1, "Collateral value is required"),
  maxLoanAmount: z.string(),
});

export type LTVRequestFormData = z.infer<typeof ltvRequestSchema>;

export const repaymentSchema = z.object({
  repaymentMethod: z.string().min(1, "Repayment method is required"),
  repaymentSource: z.string().min(1, "Source of repayment is required"),
  royaltyShare: z.string().optional(),
});

export type RepaymentFormData = z.infer<typeof repaymentSchema>;

export const documentsSchema = z.object({
  patentCertificate: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Patent Certificate/Filing Document is required"
  }),
  valuationDocument: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Valuation Document is required"
  }),
  technicalDocumentation: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Technical Documentation is required"
  }),
  financialProjection: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Financial Projection is required"
  }),
  companyRegistration: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Company Registration/KYC is required"
  }),
});

export type DocumentsFormData = z.infer<typeof documentsSchema>;

export const termsSchema = z.object({
  lockingMethod: z.string().min(1, "Collateral locking method is required"),
  autoLiquidationConsent: z.boolean().refine(val => val === true, {
    message: "You must consent to auto-liquidation terms"
  }),
  defaultHandling: z.string().min(1, "Default handling preference is required"),
});

export type TermsFormData = z.infer<typeof termsSchema>;

// Patent Vault Form validation schemas
export const patentDetailsSchema = z.object({
  patentTitle: z.string().min(1, "Patent Title is required"),
  category: z.string().min(1, "Patent Category is required. Please select a category."),
  registrationNumber: z.string().min(1, "Patent Registration Number is required"),
  filingDate: z.string().min(1, "Filing Date is required. Please select a date."),
  jurisdiction: z.string().min(1, "Jurisdiction is required. Please select a jurisdiction."),
  abstract: z.string()
    .min(10, "Patent Abstract must be at least 10 characters")
    .max(1000, "Patent Abstract must not exceed 1000 characters"),
  keywords: z.string().min(1, "Keywords are required"),
});

export type PatentDetailsFormData = z.infer<typeof patentDetailsSchema>;

export const documentationSchema = z.object({
  patentDescription: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Patent Description file is required. Please upload a file."
  }),
  technicalSpecification: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Technical Specification Document is required. Please upload a file."
  }),
  trlLevel: z.string().min(1, "TRL (Technology Readiness Level) is required. Please select a TRL level."),
});

export type DocumentationFormData = z.infer<typeof documentationSchema>;

export const commercialValueSchema = z.object({
  commercializationStage: z.string().min(1, "Current Stage of Commercialization is required. Please select a stage."),
  targetIndustry: z.string().min(1, "Target Industry is required. Please select an industry."),
  marketSize: z.string().min(1, "Market Size is required"),
  competitiveAdvantage: z.string().min(10, "Competitive Advantage must be at least 10 characters"),
});

export type CommercialValueFormData = z.infer<typeof commercialValueSchema>;

export const ownershipSchema = z.object({
  proofOfOwnership: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Proof of Patent Ownership (PDF) is required. Please upload a file."
  }),
  ownershipPercentage: z.string()
    .min(1, "Your Percentage Ownership is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0 && num <= 100;
    }, {
      message: "Your Percentage Ownership must be between 1 and 100"
    }),
  coOwners: z.array(z.object({
    name: z.string().min(1, "Co-owner name is required"),
    percentage: z.string().min(1, "Co-owner percentage is required"),
  })).optional().default([]),
});

export type OwnershipFormData = z.infer<typeof ownershipSchema>;

export const valuationSchema = z.object({
  proposedValuation: z.string()
    .min(1, "Proposed Valuation (USD) is required")
    .refine((val) => {
      const num = parseFloat(val.replace(/[^0-9.]/g, ''));
      return !isNaN(num) && num > 0;
    }, {
      message: "Proposed Valuation must be a valid positive number"
    }),
  valuationBasis: z.string().min(1, "Valuation Basis is required. Please select a valuation method."),
  valuationMethodology: z.string().min(10, "Valuation Justification must be at least 10 characters"),
});

export type ValuationFormData = z.infer<typeof valuationSchema>;

export const nftMintingSchema = z.object({
  tokenName: z.string().min(1, "IP-NFT Name is required"),
  tokenSymbol: z.string()
    .min(1, "IP-NFT Symbol is required")
    .max(10, "IP-NFT Symbol must not exceed 10 characters")
    .refine((val) => /^[A-Z0-9]+$/.test(val.toUpperCase()), {
      message: "IP-NFT Symbol should contain only letters and numbers"
    }),
  metadataVisibility: z.string().min(1, "NFT Metadata Visibility is required. Please select a visibility option."),
  fractionalizationEnabled: z.boolean(),
  totalSupply: z.string().optional(),
  initialPrice: z.string().optional(),
});

export type NFTMintingFormData = z.infer<typeof nftMintingSchema>;

// Funding Application Form validation schemas
export const applicantInfoSchema = z.object({
  walletAddress: z.string().min(1, "Wallet Address is required"),
  fullName: z.string().min(1, "Full Name / Institution Name is required"),
  email: emailSchema,
  phone: phoneSchema,
  applicantType: z.string().min(1, "Applicant Type is required. Please select an option."),
});

export type ApplicantInfoFormData = z.infer<typeof applicantInfoSchema>;

export const ipNftInfoSchema = z.object({
  ipNftId: z.string().min(1, "Please select an IP-NFT"),
  inventionName: z.string().min(1, "Invention / Technology Name is required"),
  patentNumber: z.string().min(1, "Patent Number / Registration Status is required"),
  publicationYear: z.string().min(1, "Publication Year is required"),
  ipType: z.string().min(1, "IP Type is required. Please select an option."),
  technologyCategory: z.string().min(1, "Technology Category is required. Please select an option."),
  otherCategory: z.string().optional(),
});

export type IPNftInfoFormData = z.infer<typeof ipNftInfoSchema>;

export const projectOverviewSchema = z.object({
  projectSummary: z.string()
    .min(1, "Project Summary is required")
    .refine((val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length <= 150;
    }, {
      message: "Project Summary must not exceed 150 words"
    }),
  problemBeingSolved: z.string().min(10, "Problem Being Solved must be at least 10 characters"),
  proposedSolution: z.string().min(10, "Proposed Solution / Technology must be at least 10 characters"),
  uniqueValueProposition: z.string().min(10, "Unique Value Proposition (USP) must be at least 10 characters"),
  trlLevel: z.string().min(1, "Technology Readiness Level (TRL) is required. Please select a level."),
});

export type ProjectOverviewFormData = z.infer<typeof projectOverviewSchema>;

export const commercializationPlanSchema = z.object({
  targetIndustry: z.string().min(1, "Target Industry is required"),
  commercializationModel: z.string().min(1, "Commercialization / Licensing Model is required. Please select an option."),
  timeToMarket: z.string().min(1, "Estimated Time to Market is required"),
  commercializationCost: z.string().optional(),
});

export type CommercializationPlanFormData = z.infer<typeof commercializationPlanSchema>;

export const fundingRequirementsSchema = z.object({
  totalFunding: z.string()
    .min(1, "Total Funding Requested (USDT) is required")
    .refine((val) => {
      const num = parseFloat(val.replace(/[^0-9.]/g, ''));
      return !isNaN(num) && num > 0;
    }, {
      message: "Total Funding must be a valid positive number"
    }),
  rndAllocation: z.string().optional(),
  prototypingAllocation: z.string().optional(),
  legalAllocation: z.string().optional(),
  marketTestingAllocation: z.string().optional(),
  productionAllocation: z.string().optional(),
  operationsAllocation: z.string().optional(),
  utilizationTimeline: z.string().min(1, "Funding Utilization Timeline is required"),
  hasCoInvestors: z.string().min(1, "Please specify if you have co-investors"),
  commitmentLetter: z.any().optional(),
});

export type FundingRequirementsFormData = z.infer<typeof fundingRequirementsSchema>;

export const teamExpertiseSchema = z.object({
  applicantName: z.string().min(1, "Applicant / Person in Charge (PIC) is required"),
  role: z.string().min(1, "Role / Position is required"),
  background: z.string()
    .min(1, "Short Background is required")
    .refine((val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length <= 100;
    }, {
      message: "Short Background must not exceed 100 words"
    }),
  cv: z.any().optional(),
  supportingLinks: z.string().optional(),
});

export type TeamExpertiseFormData = z.infer<typeof teamExpertiseSchema>;

export const supportingDocumentsSchema = z.object({
  technicalDocument: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Technical Document (PDF) is required. Please upload a file."
  }),
  licensingDraft: z.any().optional(),
  pitchVideo: z.any().optional(),
});

export type SupportingDocumentsFormData = z.infer<typeof supportingDocumentsSchema>;

export const declarationsSchema = z.object({
  acknowledgeEvaluation: z.boolean().refine(val => val === true, {
    message: "You must acknowledge the ERB evaluation process"
  }),
  agreeToMonitoring: z.boolean().refine(val => val === true, {
    message: "You must agree to milestone-based monitoring"
  }),
  consentToDataAccess: z.boolean().refine(val => val === true, {
    message: "You must consent to limited data access for ERB reviewers"
  }),
});

export type DeclarationsFormData = z.infer<typeof declarationsSchema>;

