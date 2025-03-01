import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { address1, address2 } = body;

    if (!address1 || !address2) {
      return new Response(JSON.stringify({ error: "Both addresses are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Use the correct model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Compare these two addresses and determine if they refer to the same location:
Address 1: ${address1}
Address 2: ${address2}

Rules:
- If the addresses are identical, return { "match": true, "confidence": 100 }.
- If they are nearby (within 5 miles), return { "match": false, "confidence": between 50-90 }.
- If they are far apart (different cities), return { "match": false, "confidence": 90-100 }.

Provide a JSON response only, in this format:
{
  "match": true or false,
  "confidence": a number from 0 to 100
}`; 


    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    // ✅ Remove backticks and trim extra spaces
    responseText = responseText.replace(/```json|```/g, "").trim();

    // ✅ Parse cleaned JSON response
    const parsedResponse = JSON.parse(responseText);

    return new Response(JSON.stringify(parsedResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error comparing addresses:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
