// src/data/legalData.ts

export interface Situation {
  id: string;
  title: string;
  info: string;
  law: string;
  rights: string[];
  steps: string[];
  documents: string[];
}

export interface LegalCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
  situations: Situation[];
}

export const legalData: LegalCategory[] = [
  {
    id: 'cat_1',
    name: 'Cyber Crime',
    slug: 'cyber-crime',
    icon: 'Shield',
    description: 'Protection against digital fraud, identity theft, and online harassment.',
    situations: [
      {
        id: 's1_1',
        title: 'Online Financial Fraud',
        info: 'Unauthorized transactions from your bank account or credit card via phishing links.',
        law: 'Section 66D of the IT Act and Section 420 of the IPC (BNS).',
        rights: ['Right to immediate freezing of fraudulent accounts', 'Right to seek restitution'],
        steps: ['Call 1930 Cyber Helpline immediately', 'Report on cybercrime.gov.in', 'Notify your bank within 3 days'],
        documents: ['Bank statement', 'Transaction SMS/Email', 'Screenshot of fraud link']
      },
      {
        id: 's1_2',
        title: 'Identity Theft',
        info: 'Someone using your personal data or photos to create fake social media profiles.',
        law: 'Section 66C of the Information Technology Act.',
        rights: ['Right to have fake profiles removed', 'Right to digital privacy'],
        steps: ['Report profile to the platform', 'Take screenshots of the fake account', 'File a complaint with the Cyber Cell'],
        documents: ['Your valid ID proof', 'Screenshots of the impersonating account']
      },
      // ... Add 2 more situations for Cyber Crime
    ]
  },
  {
    id: 'cat_2',
    name: 'Police Rights',
    slug: 'police-rights',
    icon: 'Scale',
    description: 'Knowing your rights during arrests, searches, and traffic stops.',
    situations: [
      {
        id: 's2_1',
        title: 'Arrest without Warrant',
        info: 'Police taking you into custody for a cognizable offense without a prior court order.',
        law: 'Article 22(1) of the Constitution and Section 50 of CrPC (BNSS).',
        rights: ['Right to know the grounds of arrest', 'Right to inform a relative'],
        steps: ['Ask for the Arrest Memo', 'Ensure the time/date of arrest is recorded', 'Do not resist physically'],
        documents: ['Copy of the Arrest Memo', 'Identification Proof']
      },
      // ... Add 3 more situations like Traffic Stop, Search of Premises, etc.
    ]
  },
  {
    id: 'cat_3',
    name: 'Tenant Rights',
    slug: 'tenant-rights',
    icon: 'Home',
    description: 'Protection against illegal eviction and utility disconnection.',
    situations: [
      {
        id: 's3_1',
        title: 'Unlawful Eviction',
        info: 'Being forced to vacate the property without a legal notice or court order.',
        law: 'Section 106 of the Transfer of Property Act.',
        rights: ['Right to a minimum notice period', 'Right to peaceful possession'],
        steps: ['Check your rent agreement', 'File for an injunction in civil court', 'Lodge a police complaint for harassment'],
        documents: ['Valid Rent Agreement', 'Rent receipts/Bank transfers']
      },
      // ... Add 3 more situations like Security Deposit Disputes, etc.
    ]
  },
  // Add remaining categories: Consumer Rights, Women Safety, Employment Issues
];
