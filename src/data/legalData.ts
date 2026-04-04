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
      { id: 's1', title: 'Online Fraud', info: 'Financial loss via phishing links or fake sites.', law: 'Section 66D, IT Act', rights: ['Right to seek restitution'], steps: ['Call 1930', 'Notify bank'], documents: ['Bank Statement'] },
      { id: 's2', title: 'Identity Theft', info: 'Unauthorized use of your personal data.', law: 'Section 66C, IT Act', rights: ['Right to digital privacy'], steps: ['Report to platform', 'File at cybercrime.gov.in'], documents: ['ID Proof'] },
      { id: 's3', title: 'Cyber Bullying', info: 'Harassment via digital platforms.', law: 'Section 66E, IT Act', rights: ['Right to protection'], steps: ['Take screenshots', 'Block user'], documents: ['Screenshots'] },
      { id: 's4', title: 'Hacking', info: 'Compromised social media or email.', law: 'Section 66, IT Act', rights: ['Right to secure records'], steps: ['Reset passwords', 'Notify contacts'], documents: ['Email logs'] }
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
      { id: 'p2', title: 'Traffic Stop', info: 'Stopped for a document check.', law: 'Motor Vehicles Act', rights: ['Right to officer ID', 'Right to receipt'], steps: ['Show digital docs', 'Ask for valid challan'], documents: ['License', 'RC'] },
      { id: 'p3', title: 'Filing FIR', info: 'Refusal to register a complaint.', law: 'Section 154, CrPC', rights: ['Right to free FIR copy', 'Right to Zero FIR'], steps: ['Approach SP/DCP', 'Send by Regd. Post'], documents: ['Written Complaint'] },
      { id: 'p4', title: 'Search Rights', info: 'Police searching your premises.', law: 'Section 165, CrPC', rights: ['Right to see warrant', 'Right to witnesses'], steps: ['Verify warrant', 'Ensure local witnesses'], documents: ['Search Warrant'] }
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
      { id: 't2', title: 'Deposit Refund', info: 'Refusal to return security deposit.', law: 'Contract Law', rights: ['Right to full refund'], steps: ['Document condition', 'Send legal notice'], documents: ['Rent Receipts'] },
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
      { id: 'c1', title: 'Defective Goods', info: 'Product is broken or faulty.', law: 'Sec 2(1)(g), CPA 2019', rights: ['Right to refund/repair'], steps: ['Issue formal notice', 'File on e-Daakhil'], documents: ['Invoice'] },
      { id: 'c2', title: 'Misleading Ads', info: 'False claims about a product.', law: 'CPA 2019', rights: ['Right to information'], steps: ['Record the ad', 'Complain to ASCI'], documents: ['Ad Copy'] },
      { id: 'c3', title: 'Overcharging', info: 'Charging more than the MRP.', law: 'Legal Metrology Act', rights: ['Right to fair price'], steps: ['Take photo of price', 'Ask for bill'], documents: ['Purchase Bill'] },
      { id: 'c4', title: 'Service Gap', info: 'Failure in agreed services.', law: 'CPA 2019', rights: ['Right to redressal'], steps: ['Email customer care', 'Approach forum'], documents: ['Booking Receipt'] }
    ]
  },
  {
    id: 'cat_women',
    name: 'Women Safety',
    slug: 'women-safety',
    icon: 'UserCheck',
    description: 'Protection from harassment and violence.',
    situations: [
      { id: 'w1', title: 'Office Harassment', info: 'Unwelcome advances at work.', law: 'POSH Act 2013', rights: ['Right to safe work'], steps: ['Complain to IC', 'Save evidence'], documents: ['Email/Chat logs'] },
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
