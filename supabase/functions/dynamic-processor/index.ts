import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req) => {
  // 1. Instantly approve website connections (CORS)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const query = messages[messages.length - 1].content;

    // 2. Grab the ONE key we actually care about
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    
    if (!apiKey) {
      return new Response(JSON.stringify({ 
        content: "🚨 ERROR: Missing GEMINI_API_KEY in Supabase secrets." 
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 3. Talk DIRECTLY to Google Gemini (No Pinecone, No HuggingFace)
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ 
            parts: [{ text: `You are CLAW, a highly intelligent and helpful AI legal assistant. Please answer the following user query clearly and professionally: \n\nUser Query: ${query}` }] 
        }] 
      }),
    });

    const geminiData = await geminiRes.json();

    if (geminiData.error) {
        return new Response(JSON.stringify({ 
            content: `🚨 GEMINI API ERROR: ${geminiData.error.message}` 
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const aiAnswer = geminiData.candidates[0].content.parts[0].text;

    // 4. Send the brilliant answer back to your website
    return new Response(JSON.stringify({ content: aiAnswer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ 
        content: `🚨 CRASH: ${err.message}` 
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
