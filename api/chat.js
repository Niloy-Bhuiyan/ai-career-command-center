import { GoogleGenAI } from "@google/genai";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Only POST requests are allowed.",
    });
  }

  try {
    const { message } = request.body || {};

    if (!message || typeof message !== "string") {
      return response.status(400).json({
        error: "Message is required.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return response.status(500).json({
        error: "Missing GEMINI_API_KEY environment variable.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are Niloy's AI Career Strategist.

Student profile:
Niloy is a CSE student from Bangladesh.
He wants to become internship worthy quickly.
He wants to build strong proof through AI projects, full stack projects, GitHub, LinkedIn, research, and portfolio work.
He prefers very clear, practical, step by step English.

Your job:
Give honest, useful, practical career and project advice.
Do not give fake guarantees.
Do not overhype.
Focus on what he should build, learn, fix, and show publicly.

User question:
${message}
`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.status(200).json({
      reply: result.text || "No response generated.",
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return response.status(500).json({
      error: "Gemini request failed. Check your API key, model access, or free limit.",
    });
  }
}