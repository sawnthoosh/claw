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
      { id: 's1', title: 'Online Financial Fraud', info: 'Money stolen via phishing or fake links.', law: 'Section 66D, IT Act', rights: ['Right to freeze accounts', 'Right to seek restitution'], steps: ['Call 1930 Helpline', 'Notify your Bank'], documents: ['Bank Statement', 'Transaction SMS'] },
      { id: 's2', title: 'Identity Theft', info: 'Unauthorized use of your photos or data.', law: 'Section 66C, IT Act', rights: ['Right to digital privacy'], steps: ['Report to platform', 'File at cybercrime.gov.in'], documents: ['ID Proof', 'Screenshots'] },
      { id: 's3', title: 'Cyber Bullying', info: 'Harassment via digital messages.', law: 'Section 66E, IT Act', rights: ['Right to safety online'], steps: ['Save evidence', 'Block user'], documents: ['Screenshots of chats'] },
      { id: 's4', title: 'Account Hacking', info: 'Compromised social media or email.', law: 'Section 66, IT Act', rights: ['Right to secure records'], steps: ['Reset all passwords', 'Enable 2FA'], documents: ['Email logs'] }
    ]
  },
  {
    id: 'cat_police',
    name: 'Police Rights',
    slug: 'police-rights',
    icon: 'Scale',
    description: 'Rights during arrests and searches.',
    situations: [
      { id: 'p1', title: 'Arrest Rights', info: 'Being taken into custody.', law: 'Article 22(1), Constitution', rights: ['Right to know grounds', 'Right to a lawyer'], steps: ['Ask for Arrest Memo', 'Inform relatives'], documents: ['Arrest Memo'] },
      { id: 'p2', title: 'Traffic Stop', info: 'Stopped for a document check.', law: 'Motor Vehicles Act', rights: ['Right to see officer ID', 'Right to receipt'], steps: ['Show digital docs', 'Ask for valid challan'], documents: ['License', 'RC Copy'] },
      { id: 'p3', title: 'Filing FIR', info: 'Police refusing to register a crime.', law: 'Section 154, CrPC', rights: ['Right to free FIR copy'], steps: ['Approach SP/DCP', 'Send via Registered Post'], documents: ['Written Complaint'] },
      { id: 'p4', title: 'Search of Premises', info: 'Police entering your home.', law: 'Section 165, CrPC', rights: ['Right to see warrant'], steps: ['Verify warrant', 'Ensure local witnesses'], documents: ['Search Warrant'] }
    ]
  },
  {
    id: 'cat_tenant',
    name: 'Tenant Rights',
    slug: 'tenant-rights',
    icon: 'Home',
    description: 'Rent disputes and eviction protection.',
    situations: [
      { id: 't1', title: 'Illegal Eviction', info: 'Forced out without legal notice.', law: 'Section 106, TP Act', rights: ['Right to notice period'], steps: ['Check agreement', 'File for injunction'], documents: ['Rent Agreement'] },
      { id: 't2', title: 'Deposit Refund', info: 'Refusal to return security money.', law: 'Contract Law', rights: ['Right to full refund'], steps: ['Document house condition', 'Send legal notice'], documents: ['Rent Receipts'] },
      { id: 't3', title: 'Utility Cutoff', info: 'Landlord cutting water or power.', law: 'Rent Control Act', rights: ['Right to essentials'], steps: ['Contact police', 'Approach controller'], documents: ['Utility Bills'] },
      { id: 't4', title: 'Privacy Breach', info: 'Landlord entering without consent.', law: 'Right to Privacy', rights: ['Right to possession'], steps: ['Written warning', 'Report trespass'], documents: ['Lease Agreement'] }
    ]
  },
  {
    id: 'cat_consumer',
    name: 'Consumer Rights',
    slug: 'consumer-rights',
    icon: 'ShoppingCart',
    description: 'Unfair trade and defective goods.',
    situations: [
      { id: 'c1', title: 'Defective Product', info: 'Item is broken or faulty.', law: 'Consumer Protection Act 2019', rights: ['Right to refund/repair'], steps: ['Issue formal notice', 'File on e-Daakhil'], documents: ['Invoice/Bill'] },
      { id: 'c2', title: 'Misleading Ads', info: 'False claims about a product.', law: 'CPA 2019', rights: ['Right to information'], steps: ['Record the ad', 'Complain to ASCI'], documents: ['Ad Copy'] },
      { id: 'c3', title: 'Overcharging', info: 'Selling above MRP.', law: 'Legal Metrology Act', rights: ['Right to fair price'], steps: ['Photo of price tag', 'Ask for bill'], documents: ['Purchase Bill'] },
      { id: 'c4', title: 'Service Deficiency', info: 'Failure in agreed services.', law: 'CPA 2019', rights: ['Right to redressal'], steps: ['Email customer care', 'Approach forum'], documents: ['Booking Receipt'] }
    ]
  },
  {
    id: 'cat_women',
    name: 'Women Safety',
    slug: 'women-safety',
    icon: 'UserCheck',
    description: 'Protection from harassment and violence.',
    situations: [
      { id: 'w1', title: 'Workplace Harassment', info: 'Unwelcome advances at work.', law: 'POSH Act 2013', rights: ['Right to safe work'], steps: ['Complain to IC', 'Save evidence'], documents: ['Email/Chat logs'] },
      { id: 'w2', title: 'Domestic Abuse', info: 'Physical or emotional violence.', law: 'DV Act 2005', rights: ['Right to residence'], steps: ['Call 181', 'Seek Protection Officer'], documents: ['Medical Records'] },
      { id: 'w3', title: 'Stalking', info: 'Being followed or monitored.', law: 'Section 78, BNS', rights: ['Right to dignity'], steps: ['Call 1091', 'Log incidents'], documents: ['Photo/Video'] },
      { id: 'w4', title: 'Cyber Stalking', info: 'Persistent online harassment.', law: 'IT Act & BNS', rights: ['Right to privacy'], steps: ['Report to Cyber Cell', 'Block offender'], documents: ['Screenshots'] }
    ]
  },
  {
    id: 'cat_work',
    name: 'Employment Issues',
    slug: 'employment-laws',
    icon: 'Briefcase',
    description: 'Wage protection and labor rights.',
    situations: [
      { id: 'e1', title: 'Unpaid Salary', info: 'Company withholding wages.', law: 'Payment of Wages Act', rights: ['Right to timely pay'], steps: ['Send legal notice', 'Approach Labor Court'], documents: ['Salary Slips'] },
      { id: 'e2', title: 'Wrongful Firing', info: 'Fired without notice or cause.', law: 'Labor Law & BNS', rights: ['Right to severance'], steps: ['Check contract', 'Legal notice'], documents: ['Offer Letter'] },
      { id: 'e3', title: 'Work Bullying', info: 'Persistent workplace pressure.', law: 'BNS provisions', rights: ['Right to protection'], steps: ['Document daily', 'Notify HR'], documents: ['Internal Memos'] },
      { id: 'e4', title: 'Maternity Denial', info: 'Refusal of pregnancy leave.', law: 'Maternity Benefit Act', rights: ['Right to 26 weeks pay'], steps: ['Submit medical cert', 'Report to Inspector'], documents: ['Medical Certs'] }
    ]
  }
];
