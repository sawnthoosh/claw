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
  slug: string;
  icon: string;
  description: string;
  situations: Situation[];
}

export const legalData: LegalCategory[] = [
  {
    id: 'cat_cyber',
    name: 'Cyber Crime',
    slug: 'cyber-crime',
    icon: 'Shield',
    description: 'Digital fraud and online harassment.',
    situations: [
      { id: 's1', title: 'Online Fraud', info: 'Financial loss via phishing links or fake sites.', law: 'Section 66D, IT Act', rights: ['Right to seek restitution'], steps: ['Call 1930 immediately', 'Notify your bank'], documents: ['Bank Statement', 'Transaction SMS'] },
      { id: 's2', title: 'Identity Theft', info: 'Unauthorized use of your personal data.', law: 'Section 66C, IT Act', rights: ['Right to digital privacy'], steps: ['Report to platform', 'File at cybercrime.gov.in'], documents: ['ID Proof', 'Screenshots'] },
      { id: 's3', title: 'Cyber Bullying', info: 'Harassment via digital platforms.', law: 'Section 66E, IT Act', rights: ['Right to protection'], steps: ['Take screenshots', 'Block user'], documents: ['Evidence Screenshots'] },
      { id: 's4', title: 'Account Hacking', info: 'Compromised social media or email.', law: 'Section 66, IT Act', rights: ['Right to secure records'], steps: ['Reset passwords', 'Notify contacts'], documents: ['Email logs'] }
    ]
  },
  {
    id: 'cat_police',
    name: 'Police Rights',
    slug: 'police-rights',
    icon: 'Scale',
    description: 'Rights during arrests and searches.',
    situations: [
      { id: 'p1', title: 'Arrest Rights', info: 'Being taken into custody.', law: 'Article 22(1), Constitution', rights: ['Right to know grounds', 'Right to a lawyer'], steps: ['Ask for Arrest Memo', 'Inform relatives'], documents: ['Arrest Memo', 'ID Proof'] },
      { id: 'p2', title: 'Traffic Stop', info: 'Stopped for a document check.', law: 'Motor Vehicles Act', rights: ['Right to officer ID', 'Right to receipt'], steps: ['Show digital docs', 'Ask for valid challan'], documents: ['License', 'RC'] },
      { id: 'p3', title: 'Filing FIR', info: 'Refusal to register a complaint.', law: 'Section 154, CrPC', rights: ['Right to free FIR copy'], steps: ['Approach SP/DCP', 'Send by Regd. Post'], documents: ['Written Complaint'] },
      { id: 'p4', title: 'Search Rights', info: 'Police searching your premises.', law: 'Section 165, CrPC', rights: ['Right to see warrant'], steps: ['Verify warrant', 'Ensure witnesses'], documents: ['Search Warrant'] }
    ]
  }
  // Add Tenant Rights, Consumer Rights, Women Safety, and Employment Issues similarly...
];
