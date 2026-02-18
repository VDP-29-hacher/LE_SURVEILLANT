
import { GoogleGenAI } from "@google/genai";
import { NetworkAlert } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeAlert(alert: NetworkAlert): Promise<string> {
    const prompt = `
      You are a Senior Network Security Analyst in a SOC. 
      Analyze the following network alert and provide:
      1. A clear explanation of why this is suspicious.
      2. Possible MITRE ATT&CK mapping.
      3. Recommended immediate actions for containment.
      4. A brief threat actor profile likely to use this technique.

      Alert Details:
      - Category: ${alert.category}
      - Severity: ${alert.severity}
      - Description: ${alert.description}
      - Source: ${alert.sourceIp}
      - Destination: ${alert.destIp}
      - Protocol: ${alert.protocol} (${alert.port})
      - Raw Context: ${alert.rawLogs}

      Please format the response in clean Markdown.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            temperature: 0.7,
            topP: 0.95
        }
      });

      return response.text || "No analysis available.";
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return "Analysis failed to load. Check API connectivity.";
    }
  }

  async generateRemediationPlaybook(alert: NetworkAlert): Promise<string> {
      const prompt = `
        Generate a step-by-step technical remediation playbook for the following network incident:
        "${alert.description}" involving ${alert.sourceIp} and ${alert.destIp}.
        
        The playbook should include:
        - Preparation
        - Identification
        - Containment
        - Eradication
        - Recovery
        - Lessons Learned
      `;

      try {
        const response = await this.ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: prompt,
        });
        return response.text || "No playbook generated.";
      } catch (error) {
        return "Failed to generate playbook.";
      }
  }
}

export const geminiService = new GeminiService();
