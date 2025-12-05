import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, FinancialData } from "../types";

const processEnvApiKey = process.env.API_KEY;

if (!processEnvApiKey) {
  console.error("API_KEY is missing from environment variables.");
}

export const analyzeCompany = async (entityName: string): Promise<AnalysisResult> => {
  if (!processEnvApiKey) {
    throw new Error("API Key is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey: processEnvApiKey });

  const systemInstruction = `
    Context: You are a specialized Financial Data Extraction Agent. Your sole purpose is to research corporate ownership structures and return structured data about private equity (PE) or financial sponsor involvement.

    Process:
    1. Search for the entity's recent financial history (PE buyouts, investments, exits, stake sales, strategic investments).
    2. Verify across multiple sources.
    3. If no PE involvement is found, set "Sponsor Involved" to "No" and other fields to "N/A" or "Privately Held/Publicly Traded".
    4. "Undisclosed" must be used for unknown valuations. No guessing.

    Output Format:
    You must return a raw JSON object (not Markdown, no backticks if possible, just the JSON string) with the following specific keys:
    - companyName
    - websiteUrl (The official website URL of the company, e.g., "https://www.servicetitan.com")
    - sponsorInvolved (Yes/No)
    - sponsorName (Most recent or controlling)
    - dealBackground (1-3 sentences)
    - previousDeals (Summarize any previous PE ownership or significant exits. Write "None" if this is the first institutional capital.)
    - dateTiming (Month/Year)
    - stake (Majority, Minority, 100% Buyout)
    - valuation
    - investmentAmount
    - platformVsTuckIn (Platform or Tuck-in)
    - ownershipStructure (Describe the structure. CRITICAL: Include percentage (%) stakes if publicly available, e.g., "Firm A (60%), Founders (40%)".)
    
    Do not include any introductory text or conclusions. Return ONLY the valid JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the ownership structure for: "${entityName}"`,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType: 'application/json' is NOT supported with googleSearch
        // We rely on the prompt to enforce JSON format.
      },
    });

    const text = response.text || "{}";
    const grounding = response.candidates?.[0]?.groundingMetadata;

    // Clean up potential markdown formatting in response (e.g. ```json ... ```)
    const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();
    
    let parsedData: FinancialData;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (e) {
      console.warn("Failed to parse JSON directly, attempting fallback extraction", text);
      // Fallback: If the model returns plain text despite instructions, we throw an error 
      // or meaningful message. For this app, we really expect JSON.
      throw new Error("The analysis result was not in the expected format. Please try again.");
    }

    return {
      data: parsedData,
      grounding: grounding
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};