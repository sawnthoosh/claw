/*
  # Legal Awareness Portal Database Schema

  ## Overview
  Creates the database structure for the Citizen Legal Awareness Portal to store
  legal topics, categories, and articles in an organized, accessible manner.

  ## New Tables

  ### 1. categories
  Stores main legal topic categories (Consumer Rights, Cyber Laws, Traffic Rules, etc.)
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Category name
  - `description` (text) - Brief description of the category
  - `icon` (text) - Icon name for UI display
  - `slug` (text, unique) - URL-friendly identifier
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. legal_topics
  Stores detailed legal information articles and guides
  - `id` (uuid, primary key) - Unique identifier
  - `category_id` (uuid, foreign key) - Links to categories table
  - `title` (text) - Topic title
  - `slug` (text, unique) - URL-friendly identifier
  - `summary` (text) - Brief summary
  - `content` (text) - Full article content
  - `tags` (text array) - Searchable tags
  - `difficulty_level` (text) - Complexity level (basic, intermediate, advanced)
  - `reading_time` (integer) - Estimated reading time in minutes
  - `is_published` (boolean) - Publication status
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. faqs
  Stores frequently asked questions for quick reference
  - `id` (uuid, primary key) - Unique identifier
  - `category_id` (uuid, foreign key) - Links to categories table
  - `question` (text) - The question
  - `answer` (text) - The answer
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for all content (information is meant to be publicly accessible)
  - No write access through RLS (content management would be done through admin interface)
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  slug text UNIQUE NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create legal_topics table
CREATE TABLE IF NOT EXISTS legal_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  tags text[] DEFAULT '{}',
  difficulty_level text DEFAULT 'basic',
  reading_time integer DEFAULT 5,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Published legal topics are publicly readable"
  ON legal_topics FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "FAQs are publicly readable"
  ON faqs FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_legal_topics_category_id ON legal_topics(category_id);
CREATE INDEX IF NOT EXISTS idx_legal_topics_slug ON legal_topics(slug);
CREATE INDEX IF NOT EXISTS idx_legal_topics_tags ON legal_topics USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_faqs_category_id ON faqs(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Insert initial categories
INSERT INTO categories (name, description, icon, slug, order_index) VALUES
  ('Consumer Rights', 'Learn about your rights as a consumer, how to file complaints, and protection against unfair trade practices', 'ShoppingCart', 'consumer-rights', 1),
  ('Cyber Laws', 'Understanding cyber crimes, data protection, online fraud, and digital rights in the modern age', 'Shield', 'cyber-laws', 2),
  ('Traffic Rules', 'Traffic regulations, driving licenses, vehicle registration, and road safety guidelines', 'Car', 'traffic-rules', 3),
  ('Fundamental Rights', 'Know your fundamental rights as a citizen including freedom, equality, and constitutional protections', 'Scale', 'fundamental-rights', 4),
  ('Employment Laws', 'Workplace rights, minimum wage, employment contracts, and labor dispute resolution', 'Briefcase', 'employment-laws', 5),
  ('Property Laws', 'Information about property ownership, land disputes, rental agreements, and inheritance', 'Home', 'property-laws', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample legal topics for Consumer Rights
INSERT INTO legal_topics (category_id, title, slug, summary, content, tags, difficulty_level, reading_time) 
SELECT 
  id,
  'Consumer Protection Act Overview',
  'consumer-protection-act-overview',
  'Understanding the Consumer Protection Act and how it safeguards your rights when purchasing goods and services',
  E'# Consumer Protection Act Overview\n\n## What is the Consumer Protection Act?\n\nThe Consumer Protection Act is a crucial legislation that protects consumers from unfair trade practices and ensures their rights when buying goods or services.\n\n## Key Rights Under the Act\n\n### Right to Safety\nProtection against products and services that are hazardous to life and property.\n\n### Right to Information\nRight to be informed about the quality, quantity, potency, purity, standard, and price of goods or services.\n\n### Right to Choose\nRight to have access to a variety of products at competitive prices.\n\n### Right to be Heard\nConsumers can voice their concerns and complaints in appropriate forums.\n\n### Right to Redressal\nRight to seek compensation for any loss or injury suffered.\n\n## How to File a Consumer Complaint\n\n1. **Gather Evidence**: Keep all receipts, bills, warranties, and correspondence\n2. **Contact the Seller**: First try to resolve the issue directly\n3. **File a Complaint**: If unresolved, file with the Consumer Forum\n4. **Appear for Hearings**: Attend scheduled hearings with your documents\n\n## Where to File\n\n- **District Forum**: For claims up to ₹1 crore\n- **State Commission**: For claims between ₹1 crore and ₹10 crore\n- **National Commission**: For claims exceeding ₹10 crore\n\n## Important Points to Remember\n\n- Complaints must be filed within 2 years of the cause of action\n- No court fees for claims up to ₹5 lakhs\n- Can be filed online through the official consumer portal\n- Legal representation is optional',
  ARRAY['consumer rights', 'protection act', 'complaints', 'legal rights'],
  'basic',
  8
FROM categories WHERE slug = 'consumer-rights'
ON CONFLICT (slug) DO NOTHING;

-- Insert sample legal topics for Cyber Laws
INSERT INTO legal_topics (category_id, title, slug, summary, content, tags, difficulty_level, reading_time)
SELECT 
  id,
  'Understanding Cyber Crimes and Protection',
  'cyber-crimes-protection',
  'Learn about common cyber crimes, how to protect yourself online, and legal remedies available',
  E'# Cyber Crimes and Protection\n\n## What are Cyber Crimes?\n\nCyber crimes are illegal activities carried out using computers, networks, or the internet. These can range from identity theft to online fraud.\n\n## Common Types of Cyber Crimes\n\n### Identity Theft\nUnauthorized use of someone\'s personal information for fraudulent purposes.\n\n### Online Fraud\nDeceptive practices to steal money or sensitive information through the internet.\n\n### Cyberbullying\nUsing digital platforms to harass, threaten, or humiliate others.\n\n### Phishing\nFraudulent attempts to obtain sensitive information by disguising as a trustworthy entity.\n\n### Hacking\nUnauthorized access to computer systems or networks.\n\n## How to Protect Yourself\n\n1. **Use Strong Passwords**: Create complex passwords and change them regularly\n2. **Enable Two-Factor Authentication**: Add an extra layer of security\n3. **Be Cautious with Emails**: Don\'t click suspicious links or download unknown attachments\n4. **Keep Software Updated**: Regular updates patch security vulnerabilities\n5. **Use Secure Networks**: Avoid public Wi-Fi for sensitive transactions\n6. **Monitor Your Accounts**: Regularly check bank statements and credit reports\n\n## Legal Framework\n\n### Information Technology Act, 2000\nPrimary legislation dealing with cyber crimes in India.\n\n### Key Provisions\n- Section 66: Computer-related offences\n- Section 66C: Identity theft\n- Section 66D: Cheating by personation using computer\n- Section 67: Publishing obscene material\n\n## How to Report Cyber Crime\n\n1. **Immediate Action**: Take screenshots and preserve evidence\n2. **Report Online**: Visit cybercrime.gov.in\n3. **File FIR**: Register at your nearest police station\n4. **Helpline**: Call National Cyber Crime Helpline: 1930\n\n## Your Rights\n\n- Right to privacy in digital communications\n- Right to report cyber crimes without harassment\n- Right to compensation for damages\n- Right to delete personal information from websites',
  ARRAY['cyber crime', 'online safety', 'IT act', 'digital rights'],
  'basic',
  10
FROM categories WHERE slug = 'cyber-laws'
ON CONFLICT (slug) DO NOTHING;

-- Insert FAQs
INSERT INTO faqs (category_id, question, answer, order_index)
SELECT id, 
  'How do I file a consumer complaint online?',
  'You can file a consumer complaint online through the National Consumer Helpline portal (consumerhelpline.gov.in) or the e-Daakhil platform. You''ll need to register, fill in the complaint details, upload supporting documents, and submit. The process is free for claims up to ₹5 lakhs.',
  1
FROM categories WHERE slug = 'consumer-rights'
ON CONFLICT DO NOTHING;

INSERT INTO faqs (category_id, question, answer, order_index)
SELECT id,
  'What should I do if I receive a suspicious email?',
  'Do not click any links or download attachments. Do not reply or provide any personal information. Mark it as spam/phishing, delete it, and if it claims to be from a legitimate organization, contact them directly through their official website or phone number to verify.',
  1
FROM categories WHERE slug = 'cyber-laws'
ON CONFLICT DO NOTHING;