
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  async runZenithScan(vehicleStats: any, location: string = "Palo Alto, CA") {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Perform a Digital Twin synthesis for a Tesla. Stats: ${JSON.stringify(vehicleStats)}. Location: ${location}`,
      config: {
        systemInstruction: "You are Zenith AI. Futuristic, precise diagnostics.",
        thinkingConfig: { thinkingBudget: 4000 },
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            zenithScore: { type: Type.NUMBER },
            acousticHealth: { 
              type: Type.OBJECT, 
              properties: {
                status: { type: Type.STRING },
                analysis: { type: Type.STRING },
                anomalies: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            contextualInsights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  insight: { type: Type.STRING },
                  action: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      return null;
    }
  }

  async runNoorScan(location: { latitude: number; longitude: number }) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Use gemini-2.5-flash for maps grounding as per requirements
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find high-rated nearby Masjids and verified Halal food options. Also provide today's prayer times for this location. Use Google Maps to verify live data.`,
      config: {
        tools: [{ googleMaps: {} }, { googleSearch: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude
            }
          }
        }
      },
    });

    // Since response.text for maps grounding might be markdown, we manually structure it 
    // for this demo to provide a robust UI, but in a real-world scenario, 
    // we'd extract from groundingChunks.
    const text = response.text || "";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return {
      rawText: text,
      groundingChunks: chunks
    };
  }

  async getGuardianCoaching(stats: any) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this teen's driving stats: ${JSON.stringify(stats)}. Provide a growth-oriented coaching report with XP rewards.`,
      config: {
        systemInstruction: "You are Zenith Guardian, a mentor for teenage drivers. You are encouraging, cool, and safety-obsessed. Use Gen-Z adjacent professional terminology. Focus on 'Leveling Up'.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            xpAwarded: { type: Type.NUMBER },
            coachingTip: { type: Type.STRING },
            safetyVerdict: { type: Type.STRING },
            nextChallenge: { type: Type.STRING }
          }
        }
      }
    });
    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      return null;
    }
  }

  async analyzeEfficiency(energyData: any[]) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze: ${JSON.stringify(energyData)}`,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              impact: { type: Type.STRING },
              description: { type: Type.STRING }
            }
          }
        }
      }
    });
    try {
      return JSON.parse(response.text || "[]");
    } catch (e) {
      return [];
    }
  }

  async chat(message: string, history: { role: string; content: string }[]) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: "gemini-3-pro-preview",
      config: {
        systemInstruction: "You are Zenith AI Mentor. Help drivers stay safe and improve. If the user asks about Islamic features, refer to Noor AI.",
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });
    const response = await chat.sendMessage({ message });
    return response.text;
  }
}

export const gemini = new GeminiService();
