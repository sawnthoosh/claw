import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const legalKnowledgeBase = `
# Legal Knowledge Base for CLAW Chatbot

## Consumer Rights
- Consumer Protection Act protects buyers from unfair practices
- Right to safety, information, choice, and redressal
- File complaints at district, state, or national consumer forums
- No court fees for claims under 5 lakhs
- Must file within 2 years of the incident

## Cyber Laws
- Information Technology (IT) Act 2000 governs cyber crimes
- Phishing, hacking, identity theft, cyberbullying are cyber crimes
- Use strong passwords and two-factor authentication
- Report cyber crimes at cybercrime.gov.in or call 1930
- Personal data must be protected; companies need consent to store data

## Traffic Rules
- Valid driving license required to drive
- Follow speed limits to avoid accidents
- Seat belts mandatory for front seat occupants
- Helmets mandatory for two-wheeler riders
- Parking violates traffic rules if in no-parking zones
- DUI/DWI can result in license cancellation

## Fundamental Rights
- Article 14: Equality before law
- Article 15: No discrimination on religion, caste, sex
- Article 16: Equality of opportunity in employment
- Article 19: Freedom of speech, assembly, movement
- Article 21: Right to life and personal liberty
- These rights can be exercised under legal procedures

## Employment Laws
- Minimum wage must be paid as per government standards
- 8-hour workday is standard; overtime pay required
- Written employment contract protects both parties
- Employees can form unions for collective bargaining
- Wrongful termination can be contested
- Maternity leave, sick leave, casual leave are mandatory benefits

## Property Laws
- Property ownership requires legal documentation (deed)
- Rental agreements must be in writing with clear terms
- Landlord cannot evict without legal notice and court order
- Property disputes can be filed in civil courts
- Inheritance follows the Succession Act or personal laws
- Mortgage requires proper registration

## Fundamental Duties
- Respect the Constitution and national symbols
- Cherish secular principles and brotherhood
- Protect public property and not cause damage
- Develop scientific temperament and humanism
- Safeguard the environment and wildlife
- Contribute to national service when required

## Rights During Police Arrest
- Police must inform reason for arrest
- Right to remain silent (don't self-incriminate)
- Right to legal representation
- No torture or third-degree methods allowed
- Bail can be sought in bailable offenses
- Cannot be detained for more than 24 hours without judicial order

## Marriage and Divorce Laws
- Marriage age: 18 (female), 21 (male)
- Bigamy is illegal
- Divorce requires legal proceedings in family court
- Child custody decided based on child's welfare
- Alimony and maintenance can be claimed
- Marital property can be divided equally

## Consumer Complaints Process
1. Try to resolve directly with seller/service provider
2. Gather all receipts, warranties, and correspondence
3. File complaint at district consumer forum (free for claims under 5 lakhs)
4. Provide evidence and witnesses if needed
5. Attend hearings as required
6. Appeal to higher forums if dissatisfied

## Steps to File FIR (First Information Report)
1. Visit nearest police station
2. Tell police about the crime/incident
3. Police will record your statement
4. Get a copy of the FIR
5. FIR is required for insurance claims and legal proceedings
6. Can file online in some states

## Common Legal Documents
- Affidavit: Sworn statement used in court
- Deed: Proof of property ownership/transfer
- Will: Document for inheritance planning
- Power of Attorney: Authorization for someone to act on your behalf
- Agreement: Contract between two or more parties
- Notice: Official communication with legal implications
`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (
    message.includes("consumer") ||
    message.includes("complaint") ||
    message.includes("refund") ||
    message.includes("product")
  ) {
    return `Based on Consumer Rights Law:
The Consumer Protection Act safeguards your rights when purchasing goods or services. You have the right to safety, information, choice, and redressal.

To file a complaint:
1. Gather all receipts and warranties
2. File at your district consumer forum (free for claims under ₹5 lakhs)
3. File within 2 years of the incident

Would you like to know more about consumer complaints or any specific issue?`;
  }

  if (
    message.includes("cyber") ||
    message.includes("password") ||
    message.includes("phishing") ||
    message.includes("online fraud")
  ) {
    return `Regarding Cyber Safety and Laws:
The IT Act 2000 protects you from cyber crimes like phishing, hacking, and identity theft.

Safety tips:
- Use strong, unique passwords
- Enable two-factor authentication
- Don't click suspicious links
- Keep software updated
- Monitor your accounts regularly

If you're a victim, report at cybercrime.gov.in or call National Cyber Crime Helpline: 1930

What specific cyber issue would you like help with?`;
  }

  if (
    message.includes("traffic") ||
    message.includes("driving") ||
    message.includes("license")
  ) {
    return `About Traffic Laws and Rules:
All drivers must follow these rules:
- Valid driving license required
- Follow speed limits
- Seatbelts mandatory (front seat)
- Helmets mandatory (two-wheelers)
- No parking in no-parking zones
- DUI violations lead to license suspension

Violating traffic rules can result in fines and license cancellation.

Do you have questions about a specific traffic situation?`;
  }

  if (
    message.includes("right") ||
    message.includes("constitution") ||
    message.includes("freedom")
  ) {
    return `About Your Fundamental Rights:
The Constitution guarantees several fundamental rights:

Article 14: Right to Equality
Article 15: No discrimination based on religion, caste, or sex
Article 16: Equal opportunity in employment
Article 19: Freedom of speech, assembly, and movement
Article 21: Right to life and personal liberty

These rights are protected by law and can be exercised within legal procedures.

Which specific right would you like to know more about?`;
  }

  if (
    message.includes("employment") ||
    message.includes("job") ||
    message.includes("salary") ||
    message.includes("workplace")
  ) {
    return `Regarding Employment Laws:
Your employment rights include:
- Minimum wage payment (as per government standards)
- 8-hour workday standard
- Overtime pay for extra hours
- Written employment contract
- Right to form unions
- Mandatory benefits (leave, maternity leave, sick leave)

If wrongfully terminated, you can contest in labor court.

What employment issue would you like guidance on?`;
  }

  if (
    message.includes("property") ||
    message.includes("rent") ||
    message.includes("house") ||
    message.includes("land")
  ) {
    return `About Property Laws:
Key points about property:
- Ownership requires legal deed
- Rental agreements must be in writing
- Landlord needs court order to evict
- Disputes handled in civil courts
- Inheritance follows Succession Act
- Mortgages require registration

If you're facing property disputes or eviction issues, consult a property lawyer.

Any specific property matter you need help with?`;
  }

  if (
    message.includes("marriage") ||
    message.includes("divorce") ||
    message.includes("family")
  ) {
    return `About Marriage and Family Laws:
Important family law points:
- Marriage age: 18 (female), 21 (male)
- Bigamy is illegal
- Divorce requires family court proceedings
- Child custody based on child's welfare
- Alimony and maintenance available
- Marital property divided equally

Family law matters are handled in family courts with specialized judges.

Do you need guidance on marriage, divorce, or custody issues?`;
  }

  if (
    message.includes("arrest") ||
    message.includes("police") ||
    message.includes("bail")
  ) {
    return `Your Rights During Police Arrest:
If arrested, you have these rights:
- Right to know the reason for arrest
- Right to remain silent (don't self-incriminate)
- Right to legal representation
- No torture allowed
- Cannot be detained over 24 hours without judicial order
- Bail available for bailable offenses

Always ask for a lawyer immediately after arrest.

Do you need information about any specific legal situation?`;
  }

  return `Hello! I'm CLAW, your AI legal assistant. I can help you understand laws related to:

✓ Consumer Rights - complaints, refunds, product issues
✓ Cyber Laws - online safety, cyber crimes, data protection
✓ Traffic Rules - driving, licenses, violations
✓ Fundamental Rights - constitutional rights
✓ Employment Laws - wages, contracts, workplace issues
✓ Property Laws - rent, ownership, disputes
✓ Family Laws - marriage, divorce, custody
✓ Police Rights - arrest, bail, legal procedures

Ask me any legal question in simple language, and I'll explain it in an easy-to-understand way!`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Invalid request. Please provide messages array.",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const userInput = lastMessage.content || "";

    const assistantResponse = generateResponse(userInput);

    return new Response(
      JSON.stringify({
        role: "assistant",
        content: assistantResponse,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
