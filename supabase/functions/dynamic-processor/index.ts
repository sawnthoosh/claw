import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req) => {
  // 1. Always say YES to CORS preflight checks
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const query = messages[messages.length - 1].content;

    // 2. Get the Gemini Key
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    
    // IF THE KEY IS MISSING, SEND A MESSAGE TO THE CHAT UI (No 500 Error!)
    if (!apiKey) {
      return new Response(JSON.stringify({ 
        content: "🚨 ERROR: I am missing my GEMINI_API_KEY. Please add it to the Supabase Edge Function Secrets!" 
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 3. Ask Gemini directly
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ 
            parts: [{ text: `You are CLAW, an expert AI legal assistant. Answer this legal query simply and professionally: \n\nQuery: ${query}` }] 
        }] 
      }),
    });

    const geminiData = await geminiRes.json();

    // IF GEMINI FAILS, SEND THE REASON TO THE CHAT UI
    if (geminiData.error) {
        return new Response(JSON.stringify({ 
            content: `🚨 GEMINI API ERROR: ${geminiData.error.message}` 
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const aiAnswer = geminiData.candidates[0].content.parts[0].text;

    // 4. Send the successful answer back
    return new Response(JSON.stringify({ content: aiAnswer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    // IF THE CODE CRASHES, SEND THE REASON TO THE CHAT UI
    return new Response(JSON.stringify({ 
        content: `🚨 FATAL CRASH: ${err.message}` 
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
