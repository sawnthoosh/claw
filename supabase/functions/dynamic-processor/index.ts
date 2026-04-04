import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req) => {
  // 1. Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const query = messages[messages.length - 1].content;

    // 2. Get Vector from HuggingFace
    const hfRes = await fetch("https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2", {
      method: "POST",
      headers: { Authorization: `Bearer ${Deno.env.get("HUGGINGFACE_API_KEY")}` },
      body: JSON.stringify({ inputs: query }),
    });
    const vector = await hfRes.json();

    // 3. Query your Pinecone Data
    const pcRes = await fetch(`${Deno.env.get("PINECONE_HOST")}/query`, {
      method: "POST",
      headers: { "Api-Key": Deno.env.get("PINECONE_API_KEY")!, "Content-Type": "application/json" },
      body: JSON.stringify({ vector, topK: 3, includeMetadata: true }),
    });
    const pcData = await pcRes.json();
    const context = pcData.matches ? pcData.matches.map((m: any) => m.metadata.text).join("\n\n") : "No specific legal context found.";

    // 4. Get Smart Answer from Gemini
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${Deno.env.get("GEMINI_API_KEY")}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: `Use this legal context to answer the query simply: \n${context}\n\nQuery: ${query}` }] }] }),
    });
    const geminiData = await geminiRes.json();
    const aiAnswer = geminiData.candidates[0].content.parts[0].text;

    // 5. Send back to your website
    return new Response(JSON.stringify({ content: aiAnswer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }
});
