import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const query = messages[messages.length - 1].content;

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    
    if (!apiKey) {
      return new Response(JSON.stringify({ 
        content: "🚨 ERROR: Missing GEMINI_API_KEY in Supabase secrets." 
      }), { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    // Direct fetch to Gemini API using a valid model
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ 
            parts: [{ text: `You are CLAW, a helpful AI legal assistant. Answer this query: \n\n${query}` }] 
        }] 
      }),
    });

    const geminiData = await geminiRes.json();

    if (geminiData.error) {
        return new Response(JSON.stringify({ 
            content: `🚨 GEMINI API ERROR: ${geminiData.error.message}` 
        }), { 
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
    }

    const aiAnswer = geminiData.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ content: aiAnswer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ 
        content: `🚨 CRASH: ${err.message}` 
    }), { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }
});
