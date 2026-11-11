// Cloudflare Worker: secure AI tutor proxy. Add OPENAI_API_KEY as encrypted Worker secret.
export default {
  async fetch(request, env) {
    const cors = {"Access-Control-Allow-Origin":env.ALLOWED_ORIGIN||"*","Access-Control-Allow-Methods":"POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type"};
    if(request.method==="OPTIONS") return new Response(null,{headers:cors});
    if(request.method!=="POST") return Response.json({error:"Method not allowed"},{status:405,headers:cors});
    if(!env.OPENAI_API_KEY) return Response.json({error:"Tutor is not configured"},{status:500,headers:cors});
    try {
      const body=await request.json();
      if(typeof body.question!=="string"||body.question.length>4000) return Response.json({error:"A question of up to 4,000 characters is required."},{status:400,headers:cors});
      const response=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Authorization":"Bearer "+env.OPENAI_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({
        model:env.OPENAI_MODEL||"gpt-4.1-mini",
        instructions:"You are the AI LAB tutor. Teach patiently and accurately. Explain foundations before advanced details. Use short steps, practical examples and Socratic questions. Help the learner understand rather than simply completing assignments.",
        input:(body.context||"")+"\n\nLearner question: "+body.question,max_output_tokens:900
      })});
      const data=await response.json();
      if(!response.ok) return Response.json({error:data.error?.message||"AI request failed"},{status:response.status,headers:cors});
      const answer=(data.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==="output_text").map(x=>x.text).join("\n");
      return Response.json({answer},{headers:{...cors,"Content-Type":"application/json"}});
    } catch(e) { return Response.json({error:"Unexpected tutor error"},{status:500,headers:cors}); }
  }
};
