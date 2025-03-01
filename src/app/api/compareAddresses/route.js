import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { address1, address2 } = body;

    if (!address1 || !address2) {
      return new Response(
        JSON.stringify({ error: "Both addresses are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

   
    const cleanAddress1 = address1.toLowerCase().trim();
    const cleanAddress2 = address2.toLowerCase().trim();

    if (cleanAddress1 === cleanAddress2) {
      return new Response(
        JSON.stringify({ match: true, confidence: 100 }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Given two addresses, determine their similarity based on the following rules:
1. If the addresses are identical, return { "match": true, "confidence": 100 }.
2. If they refer to the same place but are written differently (e.g., 'Googleplex' vs. '1600 Amphitheatre Parkway'), return { "match": true, "confidence": 90-99 }.
3. If they are within the same area or neighborhood (e.g., 'Connaught Place' vs. 'Rajiv Chowk'), return { "match": false, "confidence": 70-89 }.
4. If they are in different cities or regions, return { "match": false, "confidence": 90-100 }.

Now compare these addresses:

Address 1: "${cleanAddress1}"
Address 2: "${cleanAddress2}"

Return ONLY a JSON response:
{
  "match": true or false,
  "confidence": a number from 0 to 100
}`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    
    responseText = responseText.replace(/```json|```/g, "").trim();


    const parsedResponse = JSON.parse(responseText);

    return new Response(JSON.stringify(parsedResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error comparing addresses:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
