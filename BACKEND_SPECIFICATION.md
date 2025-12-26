# NanoFi Phase 1 - Backend Development Specification

Dokumentasi lengkap semua fitur aplikasi untuk referensi pengembangan backend.

## 📋 Daftar Isi

1. [Authentication & User Management](#1-authentication--user-management)
2. [Vault Management](#2-vault-management)
3. [Patent Tokenization](#3-patent-tokenization)
4. [Profile Management](#4-profile-management)
5. [IP-NFT Management](#5-ip-nft-management)
6. [Lending & Funding](#6-lending--funding)
7. [Portfolio & Analytics](#7-portfolio--analytics)
8. [API Endpoints Specification](#8-api-endpoints-specification)
9. [Data Models](#9-data-models)
10. [Validation Rules](#10-validation-rules)

---

## 1. Authentication & User Management

### 1.1 User Registration (Signup)

**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "fullName": "string (min: 2 chars)",
  "email": "string (valid email format)",
  "password": "string (min: 8 chars, must contain: uppercase, lowercase, number)",
  "confirmPassword": "string (must match password)"
}
```

**Validation Rules:**
- Email: Valid email format, unique
- Password: Minimum 8 characters, must contain:
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
- Confirm Password: Must match password

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "string",
    "email": "string",
    "fullName": "string",
    "role": "user" | "spv",
    "createdAt": "ISO 8601 datetime"
  },
  "token": "JWT token"
}
```

**Auto-login:** Setelah signup berhasil, user otomatis login dan redirect ke `/vault`

---

### 1.2 User Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "string",
    "email": "string",
    "role": "user" | "spv",
    "fullName": "string"
  },
  "token": "JWT token"
}
```

**Redirect:** Setelah login berhasil, semua user redirect ke `/vault`

**Dummy Accounts (untuk testing):**
- `demo@nanofi.com` / `Demo123` (role: user)
- `test@nanofi.com` / `Test123` (role: user)
- `admin@nanofi.com` / `Admin123` (role: user)
- `spv@nanofi.com` / `SPV123` (role: spv)

---

### 1.3 User Roles

- **user**: Regular user, dapat submit patent, manage profile
- **spv**: Special Purpose Vehicle user, dapat review dan approve patent applications

---

### 1.4 Protected Routes

Semua route berikut memerlukan authentication:
- `/vault` - Vault overview
- `/vault/tokenize` - Tokenize patent form
- `/profile` - Profile management
- `/profile/edit` - Edit profile

Jika user tidak authenticated, redirect ke `/login` dengan state untuk redirect kembali setelah login.

---

## 2. Vault Management

### 2.1 Vault Overview Page (`/vault`)

**Components:**
- **VaultHero**: Hero section dengan tombol "Tokenize Patent"
- **VaultStats**: Statistik cards (Total Patents, Total Value, Active IP-NFTs, Pending Reviews)
- **PatentTable**: Tabel daftar semua patents dengan status
- **TokenizeSteps**: Step-by-step guide untuk tokenisasi
- **BenefitsSection**: Informasi benefits tokenisasi

### 2.2 Patent Table

**Data Structure:**
```typescript
interface Patent {
  no: number;
  id: string; // Patent ID
  title: string;
  field: string; // Technology field
  status: "minted" | "approved" | "pending" | "rejected";
  valuation: string; // Format: "$450,000"
  mintDate: string;
  time: string; // Relative time, e.g., "1h ago"
}
```

**Status Types:**
- `minted`: Patent sudah di-mint sebagai IP-NFT
- `approved`: Application approved, siap untuk minting
- `pending`: Application sedang dalam review
- `rejected`: Application ditolak

**Features:**
- Search functionality
- Filter by status
- Sort by date, valuation, status
- View details
- Action buttons (Buy, View, etc.)

---

### 2.3 Vault Statistics

**Metrics:**
- Total Patents: Total jumlah patents di vault
- Total Value: Total nilai semua patents (USD)
- Active IP-NFTs: Jumlah IP-NFTs yang aktif
- Pending Reviews: Jumlah applications yang pending review

**Endpoint:** `GET /api/vault/stats`

**Response:**
```json
{
  "totalPatents": 0,
  "totalValue": "$0",
  "activeIPNFTs": 0,
  "pendingReviews": 0
}
```

---

## 3. Patent Tokenization

### 3.1 Multi-Step Form Structure

Form tokenisasi patent terdiri dari 8 section:

1. **Inventor Details** (`inventor`)
2. **Patent Details** (`patent`)
3. **Documentation** (`documentation`)
4. **Commercial Value & Market Information** (`commercial`)
5. **Ownership Verification** (`ownership`)
6. **Requested IP Valuation** (`valuation`)
7. **IP-NFT Minting Parameters** (`nft`)
8. **Sign & Submit** (`submit`)

**Auto-save:** Form data otomatis disimpan ke localStorage saat user mengisi

**Progress Tracking:** Progress bar menunjukkan completion percentage

---

### 3.2 Section 1: Inventor Details

**Endpoint:** `POST /api/patent/inventor`

**Data Structure:**
```typescript
{
  fullName: string; // Required, min 1 char
  role: string; // Required, options: "Inventor", "Founder", "Research Institution", "Company"
  email: string; // Required, valid email format
  phone: string; // Optional, 7-15 digits, supports international format
  country: string; // Required, country of origin
  website: string; // Optional, valid URL (supports LinkedIn, GitHub, institution pages)
}
```

**Country Options:** 50+ countries dengan flag emoji

**Validation:**
- Email: Valid email format
- Phone: Optional, jika diisi harus 7-15 digits
- Website: Optional, jika diisi harus valid URL

---

### 3.3 Section 2: Patent Details

**Endpoint:** `POST /api/patent/details`

**Data Structure:**
```typescript
{
  patentTitle: string; // Required
  category: string; // Required, options:
  // "Biotechnology", "Software & IT", "Medical Devices", "Clean Energy",
  // "Pharmaceuticals", "Nanotechnology", "Artificial Intelligence", "Materials Science",
  // "Automotive", "Aerospace", "Telecommunications", "Consumer Electronics"
  registrationNumber: string; // Required, e.g., "US10,123,456"
  filingDate: string; // Required, ISO date format
  jurisdiction: string; // Required, options:
  // "USPTO (United States)", "EPO (Europe)", "JPO (Japan)", "CNIPA (China)",
  // "KIPO (South Korea)", "UKIPO (United Kingdom)", "CIPO (Canada)", "IP Australia",
  // "DJKI (Indonesia)", "WIPO (International)"
  abstract: string; // Required, min 10 chars, max 1000 chars
  keywords: string; // Required
}
```

---

### 3.4 Section 3: Documentation

**Endpoint:** `POST /api/patent/documentation` (multipart/form-data)

**Data Structure:**
```typescript
{
  patentDescription: File; // Required, PDF file
  technicalSpecification: File; // Required, PDF file
  trlLevel: string; // Required, Technology Readiness Level
  // Options: "TRL 1-9" levels
}
```

**File Requirements:**
- Patent Description: PDF, max size (to be defined)
- Technical Specification: PDF, max size (to be defined)

---

### 3.5 Section 4: Commercial Value & Market Information

**Endpoint:** `POST /api/patent/commercial-value`

**Data Structure:**
```typescript
{
  commercializationStage: string; // Required, options:
  // "Research & Development", "Proof of Concept", "Prototype Development",
  // "Pilot Production", "Initial Market Entry", "Growth Phase",
  // "Mature Product", "Licensed to Third Party"
  targetIndustry: string; // Required, options:
  // "Healthcare & Pharmaceuticals", "Information Technology", "Automotive",
  // "Energy & Clean Tech", "Consumer Electronics", "Manufacturing",
  // "Aerospace & Defense", "Agriculture & Food Tech",
  // "Financial Services", "Telecommunications"
  marketSize: string; // Required
  competitiveAdvantage: string; // Required, min 10 chars
}
```

---

### 3.6 Section 5: Ownership Verification

**Endpoint:** `POST /api/patent/ownership`

**Data Structure:**
```typescript
{
  proofOfOwnership: File; // Required, PDF file
  ownershipPercentage: string; // Required, number between 1-100
  coOwners: Array<{ // Optional array
    name: string; // Required
    percentage: string; // Required
  }>;
}
```

**Validation:**
- Ownership percentage: 1-100
- Total ownership (user + co-owners) harus = 100%
- Co-owners: Optional, bisa multiple

---

### 3.7 Section 6: Requested IP Valuation

**Endpoint:** `POST /api/patent/valuation`

**Data Structure:**
```typescript
{
  proposedValuation: string; // Required, positive number (USD)
  valuationBasis: string; // Required, options:
  // "Income Approach", "Market Approach", "Cost Approach"
  valuationMethodology: string; // Required, min 10 chars, justification text
}
```

**Validation:**
- Proposed Valuation: Must be positive number
- Valuation Methodology: Minimum 10 characters

---

### 3.8 Section 7: IP-NFT Minting Parameters

**Endpoint:** `POST /api/patent/nft-parameters`

**Data Structure:**
```typescript
{
  tokenName: string; // Required, unique name for IP-NFT
  tokenSymbol: string; // Required, max 10 chars, uppercase, alphanumeric only
  metadataVisibility: string; // Required, options:
  // "Public", "Private", "Restricted"
  fractionalizationEnabled: boolean; // Default: false
  totalSupply: string; // Optional, if fractionalization enabled
  initialPrice: string; // Optional, if fractionalization enabled
}
```

**Validation:**
- Token Symbol: Max 10 characters, uppercase, alphanumeric only
- Auto-uppercase: Token symbol otomatis di-uppercase

---

### 3.9 Section 8: Sign & Submit

**Endpoint:** `POST /api/patent/submit`

**Data Structure:**
```typescript
{
  // All previous sections data combined
  inventor: InventorFormData;
  patent: PatentDetailsFormData;
  documentation: DocumentationFormData;
  commercial: CommercialValueFormData;
  ownership: OwnershipFormData;
  valuation: ValuationFormData;
  nft: NFTMintingFormData;
  
  // Additional submission data
  signature: string; // Digital signature or consent
  termsAccepted: boolean; // Must be true
  privacyAccepted: boolean; // Must be true
}
```

**Response:**
```json
{
  "success": true,
  "applicationId": "string",
  "status": "pending",
  "submittedAt": "ISO 8601 datetime",
  "message": "Application submitted successfully"
}
```

**Status Flow:**
1. `pending` - Application submitted, waiting for review
2. `approved` - Approved by SPV reviewer
3. `rejected` - Rejected by SPV reviewer
4. `minted` - IP-NFT successfully minted

---

## 4. Profile Management

### 4.1 Profile Overview (`/profile` - tab: overview)

**Data Displayed:**
- User information (name, email, avatar)
- Verification status
- Account statistics
- Quick actions

**Endpoint:** `GET /api/profile/overview`

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "fullName": "string",
    "avatar": "string (URL)",
    "verified": boolean,
    "role": "user" | "spv"
  },
  "stats": {
    "totalIPNFTs": 0,
    "totalValue": "$0",
    "activeLoans": 0,
    "pendingApplications": 0
  }
}
```

---

### 4.2 Edit Profile (`/profile/edit`)

**Endpoint:** `PUT /api/profile`

**Request Body:**
```json
{
  "fullName": "string (min: 2 chars)",
  "email": "string (valid email)",
  "phone": "string (optional)",
  "bio": "string (max: 500 chars, optional)",
  "location": "string (optional)",
  "website": "string (valid URL, optional)",
  "profileImage": "File (image, optional)"
}
```

**Password Change:**
**Endpoint:** `PUT /api/profile/password`

**Request Body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string (min: 8 chars, must contain: uppercase, lowercase, number, special char)",
  "confirmPassword": "string (must match newPassword)"
}
```

---

### 4.3 Wallets Section (`/profile` - tab: wallets)

**Features:**
- Connect/Disconnect wallets
- View wallet addresses
- Copy wallet address
- Multiple wallet support

**Endpoint:** `GET /api/profile/wallets`

**Response:**
```json
{
  "wallets": [
    {
      "id": "string",
      "address": "string",
      "network": "string", // e.g., "Ethereum", "Solana", "Polygon"
      "label": "string", // e.g., "Primary Wallet", "Trading Wallet"
      "connectedAt": "ISO 8601 datetime"
    }
  ]
}
```

**Endpoint:** `POST /api/profile/wallets` - Connect new wallet

**Endpoint:** `DELETE /api/profile/wallets/:id` - Disconnect wallet

---

### 4.4 My IP-NFTs Section (`/profile` - tab: ip-nfts)

**Endpoint:** `GET /api/profile/ip-nfts`

**Response:**
```json
{
  "ipNFTs": [
    {
      "id": "string", // IP-NFT ID
      "title": "string",
      "status": "Verified" | "Pending" | "Rejected",
      "valuation": "string", // Format: "$250,000"
      "usage": "Collateral" | "Marketplace" | "Idle",
      "mintedAt": "ISO 8601 datetime"
    }
  ]
}
```

**Features:**
- View all user's IP-NFTs
- Filter by status
- View details
- Actions: View, Transfer, List on Marketplace

---

### 4.5 Lending & Funding Section (`/profile` - tab: lending-funding)

**Features:**
- Loan applications history
- Funding applications history
- Active loans
- Repayment schedule

**Endpoint:** `GET /api/profile/lending-funding`

**Response:**
```json
{
  "loans": [
    {
      "id": "string",
      "type": "string",
      "amount": "string",
      "status": "active" | "completed" | "defaulted",
      "interestRate": "string",
      "startDate": "ISO 8601 datetime",
      "endDate": "ISO 8601 datetime"
    }
  ],
  "funding": [
    {
      "id": "string",
      "amount": "string",
      "status": "pending" | "approved" | "rejected",
      "submittedAt": "ISO 8601 datetime"
    }
  ]
}
```

---

### 4.6 Portfolio Section (`/profile` - tab: portfolio)

**Endpoint:** `GET /api/profile/portfolio`

**Response:**
```json
{
  "totalValue": "$0",
  "ipNFTs": 0,
  "activeLoans": 0,
  "totalEarnings": "$0",
  "performance": {
    "valueChange": "+0%",
    "period": "30d"
  },
  "breakdown": [
    {
      "category": "string",
      "value": "$0",
      "percentage": 0
    }
  ]
}
```

**Features:**
- Portfolio value overview
- Performance metrics
- Asset breakdown
- Historical charts

---

### 4.7 Security Settings Section (`/profile` - tab: security)

**Features:**
- Change password
- Two-factor authentication (2FA)
- Session management
- Privacy settings
- API keys management

**Endpoint:** `PUT /api/profile/security`

**Request Body:**
```json
{
  "twoFactorEnabled": boolean,
  "privacySettings": {
    "profileVisibility": "public" | "private" | "friends",
    "showEmail": boolean,
    "showPhone": boolean
  }
}
```

---

## 5. IP-NFT Management

### 5.1 IP-NFT Data Structure

```typescript
interface IPNFT {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  patentId: string;
  patentTitle: string;
  owner: string; // User ID
  valuation: number; // USD
  status: "pending" | "verified" | "minted" | "rejected";
  metadata: {
    visibility: "public" | "private" | "restricted";
    fractionalizationEnabled: boolean;
    totalSupply?: number;
    initialPrice?: number;
  };
  mintedAt?: string; // ISO 8601 datetime
  contractAddress?: string; // Blockchain address
  network?: string; // Blockchain network
}
```

---

### 5.2 IP-NFT Status Flow

1. **pending** - Application submitted, waiting for review
2. **approved** - Application approved by SPV
3. **minted** - IP-NFT successfully minted on blockchain
4. **rejected** - Application rejected

---

## 6. Lending & Funding

### 6.1 Loan Application Form

**Multi-step form dengan sections:**

1. **Borrower Information**
2. **Collateral Selection** (IP-NFT)
3. **Loan Request Details**
4. **Risk & Compliance**
5. **LTV (Loan-to-Value) Request**
6. **Repayment Plan**
7. **Required Documents**
8. **Terms & Conditions**

**Endpoint:** `POST /api/loans/apply`

**Data Structure:** (See validation.ts for complete schema)

---

### 6.2 Funding Application Form

**Multi-step form dengan sections:**

1. **Applicant Information**
2. **IP-NFT Information**
3. **Project Overview**
4. **Commercialization Plan**
5. **Funding Requirements**
6. **Team & Expertise**
7. **Supporting Documents**
8. **Declarations**

**Endpoint:** `POST /api/funding/apply`

**Data Structure:** (See validation.ts for complete schema)

---

## 7. Portfolio & Analytics

### 7.1 Portfolio Metrics

- Total Portfolio Value
- Number of IP-NFTs
- Active Loans
- Total Earnings
- Performance (value change over time)
- Asset Breakdown by Category

**Endpoint:** `GET /api/portfolio`

---

## 8. API Endpoints Specification

### 8.1 Authentication Endpoints

```
POST   /api/auth/signup          - User registration
POST   /api/auth/login           - User login
POST   /api/auth/logout          - User logout
POST   /api/auth/refresh         - Refresh JWT token
GET    /api/auth/me              - Get current user
```

### 8.2 Patent Endpoints

```
GET    /api/patents              - Get all patents (with filters)
GET    /api/patents/:id          - Get patent details
POST   /api/patents              - Submit patent tokenization application
PUT    /api/patents/:id          - Update patent application
DELETE /api/patents/:id          - Delete patent application
GET    /api/patents/:id/status   - Get application status
```

### 8.3 Vault Endpoints

```
GET    /api/vault                - Get vault overview
GET    /api/vault/stats          - Get vault statistics
GET    /api/vault/applications   - Get all applications
GET    /api/vault/applications/:id - Get application details
PUT    /api/vault/applications/:id/status - Update application status (SPV only)
```

### 8.4 Profile Endpoints

```
GET    /api/profile              - Get user profile
PUT    /api/profile              - Update profile
PUT    /api/profile/password     - Change password
GET    /api/profile/wallets      - Get connected wallets
POST   /api/profile/wallets     - Connect wallet
DELETE /api/profile/wallets/:id  - Disconnect wallet
GET    /api/profile/ip-nfts     - Get user's IP-NFTs
GET    /api/profile/portfolio   - Get portfolio data
GET    /api/profile/lending-funding - Get lending & funding history
PUT    /api/profile/security    - Update security settings
```

### 8.5 IP-NFT Endpoints

```
GET    /api/ip-nfts              - Get all IP-NFTs
GET    /api/ip-nfts/:id          - Get IP-NFT details
POST   /api/ip-nfts/:id/mint     - Mint IP-NFT (after approval)
GET    /api/ip-nfts/:id/metadata - Get IP-NFT metadata
PUT    /api/ip-nfts/:id          - Update IP-NFT
```

### 8.6 Loan Endpoints

```
POST   /api/loans/apply          - Submit loan application
GET    /api/loans                - Get user's loans
GET    /api/loans/:id            - Get loan details
PUT    /api/loans/:id/repay      - Make repayment
```

### 8.7 Funding Endpoints

```
POST   /api/funding/apply        - Submit funding application
GET    /api/funding              - Get user's funding applications
GET    /api/funding/:id          - Get funding application details
```

---

## 9. Data Models

### 9.1 User Model

```typescript
interface User {
  id: string;
  email: string;
  fullName: string;
  password: string; // Hashed
  role: "user" | "spv";
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string; // URL
  verified: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

### 9.2 Patent Application Model

```typescript
interface PatentApplication {
  id: string;
  submittedBy: string; // User ID
  status: "pending" | "approved" | "rejected" | "minted";
  submittedAt: string; // ISO 8601
  reviewedBy?: string; // User ID (SPV)
  reviewedAt?: string; // ISO 8601
  reviewNotes?: string;
  
  // Form data
  inventor: InventorFormData;
  patent: PatentDetailsFormData;
  documentation: {
    patentDescription: string; // File URL
    technicalSpecification: string; // File URL
    trlLevel: string;
  };
  commercial: CommercialValueFormData;
  ownership: OwnershipFormData;
  valuation: ValuationFormData;
  nft: NFTMintingFormData;
}
```

### 9.3 IP-NFT Model

```typescript
interface IPNFT {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  patentApplicationId: string;
  owner: string; // User ID
  valuation: number; // USD
  status: "pending" | "verified" | "minted" | "rejected";
  metadata: {
    visibility: "public" | "private" | "restricted";
    fractionalizationEnabled: boolean;
    totalSupply?: number;
    initialPrice?: number;
  };
  contractAddress?: string;
  network?: string;
  mintedAt?: string; // ISO 8601
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

### 9.4 Wallet Model

```typescript
interface Wallet {
  id: string;
  userId: string;
  address: string;
  network: string; // "Ethereum", "Solana", "Polygon", etc.
  label: string;
  isPrimary: boolean;
  connectedAt: string; // ISO 8601
}
```

---

## 10. Validation Rules

### 10.1 Email Validation
- Format: Valid email format
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Unique: Must be unique in database

### 10.2 Password Validation
- Minimum: 8 characters
- Must contain:
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (for password change)

### 10.3 Phone Validation
- Optional field
- If provided: 7-15 digits
- Supports international formats: `+1-555-123-4567`, `(555) 123-4567`

### 10.4 URL/Website Validation
- Optional field
- If provided: Valid URL format
- Supports: `https://example.com`, `linkedin.com/in/username`, `github.com/username`

### 10.5 File Upload Validation
- Patent Description: PDF required
- Technical Specification: PDF required
- Proof of Ownership: PDF required
- Max file size: (to be defined)
- Allowed MIME types: `application/pdf`

### 10.6 Number Validation
- Valuation: Positive number
- Ownership Percentage: 1-100
- Total ownership (user + co-owners) must equal 100%

### 10.7 Text Length Validation
- Patent Abstract: 10-1000 characters
- Competitive Advantage: Minimum 10 characters
- Valuation Methodology: Minimum 10 characters
- Bio: Maximum 500 characters
- Project Summary: Maximum 150 words
- Short Background: Maximum 100 words

---

## 11. File Storage Requirements

### 11.1 Required File Uploads

**Patent Tokenization:**
- Patent Description (PDF)
- Technical Specification (PDF)
- Proof of Ownership (PDF)

**Loan Application:**
- Patent Certificate/Filing Document
- Valuation Document
- Technical Documentation
- Financial Projection
- Company Registration/KYC

**Funding Application:**
- Technical Document (PDF)
- Licensing Draft (optional)
- Pitch Video (optional)

### 11.2 File Storage Strategy
- Store files in cloud storage (AWS S3, Cloudinary, etc.)
- Generate unique file URLs
- Implement file access control
- Support file preview/download

---

## 12. Workflow & Status Management

### 12.1 Patent Application Workflow

```
1. User submits application → status: "pending"
2. SPV reviews application
   - If approved → status: "approved"
   - If rejected → status: "rejected" (with review notes)
3. If approved, user can mint IP-NFT
4. After minting → status: "minted"
```

### 12.2 IP-NFT Status Flow

```
1. Application approved → IP-NFT created with status: "pending"
2. Verification process → status: "verified"
3. Minting on blockchain → status: "minted"
4. If rejected → status: "rejected"
```

---

## 13. Security Requirements

### 13.1 Authentication
- JWT tokens for API authentication
- Token expiration: 24 hours (configurable)
- Refresh token mechanism
- Password hashing: bcrypt or similar

### 13.2 Authorization
- Role-based access control (RBAC)
- SPV users can review/approve applications
- Users can only access their own data
- Protected routes require authentication

### 13.3 Data Protection
- Input validation on all endpoints
- SQL injection prevention
- XSS prevention
- CSRF protection
- File upload validation and scanning

---

## 14. Additional Features

### 14.1 Auto-save Functionality
- Form data auto-saved to localStorage (frontend)
- Backend should support draft saving
- Resume form from last saved state

### 14.2 Progress Tracking
- Track completion percentage for multi-step forms
- Visual progress indicators
- Section validation status

### 14.3 Notifications
- Email notifications for:
  - Application status changes
  - Review requests (for SPV)
  - IP-NFT minting completion
  - Loan/funding application updates

### 14.4 Search & Filter
- Search patents by title, ID, field
- Filter by status, date, valuation
- Sort by various criteria

---

## 15. Database Schema Recommendations

### 15.1 Core Tables

- `users` - User accounts
- `patent_applications` - Patent tokenization applications
- `ip_nfts` - IP-NFT records
- `wallets` - Connected wallets
- `loans` - Loan applications and records
- `funding_applications` - Funding applications
- `files` - File storage metadata
- `notifications` - User notifications

### 15.2 Relationships

- User 1:N Patent Applications
- User 1:N IP-NFTs
- User 1:N Wallets
- User 1:N Loans
- User 1:N Funding Applications
- Patent Application 1:1 IP-NFT (after approval)
- IP-NFT 1:N Loans (as collateral)

---

## 16. Environment Variables

```env
# Database
DATABASE_URL=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=24h

# File Storage
STORAGE_PROVIDER=aws|cloudinary|local
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
CLOUDINARY_URL=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

# Blockchain (for IP-NFT minting)
BLOCKCHAIN_NETWORK=
CONTRACT_ADDRESS=
PRIVATE_KEY=
```

---

## 17. Testing Accounts

### Regular Users
- `demo@nanofi.com` / `Demo123`
- `test@nanofi.com` / `Test123`
- `admin@nanofi.com` / `Admin123`

### SPV Users
- `spv@nanofi.com` / `SPV123`

---

## 18. API Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "string (optional)"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": {} // Optional
  }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## 19. Rate Limiting

- Authentication endpoints: 5 requests per minute
- API endpoints: 100 requests per minute per user
- File upload: 10 uploads per hour per user

---

## 20. Notes for Backend Development

1. **Form Auto-save**: Implement draft saving mechanism
2. **File Upload**: Use multipart/form-data for file uploads
3. **Validation**: Implement server-side validation matching frontend schemas
4. **Status Management**: Track status changes with timestamps
5. **Audit Trail**: Log all important actions (submissions, approvals, etc.)
6. **Email Notifications**: Send emails for status changes
7. **Blockchain Integration**: Prepare for IP-NFT minting on blockchain
8. **Search**: Implement full-text search for patents
9. **Analytics**: Track user actions and application metrics
10. **Caching**: Cache frequently accessed data (stats, user profile)

---

**Document Version:** 1.0  
**Last Updated:** December 2024  
**Repository:** https://github.com/TioEnth06/NanoFi-Phase1.git

