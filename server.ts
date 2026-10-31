import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK if key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI with provided key:', err);
  }
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// AI Enhancement Endpoint for PRD & Prompt Sharpening
app.post('/api/ai/enhance', async (req: Request, res: Response) => {
  try {
    const { action, prdData, targetAiModel, promptStyle, language = 'id' } = req.body;

    if (!aiClient) {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: 'No GEMINI_API_KEY configured. Utilizing client-side heuristic engine.',
      });
    }

    let systemInstruction = '';
    let userPrompt = '';

    if (action === 'enrich_prd') {
      systemInstruction = `You are a Principal Product Manager and Technical Architect.
Your task is to review a draft product requirement and provide crisp, professional, production-grade enhancements in ${language === 'id' ? 'Bahasa Indonesia' : 'English'}.
Return a strictly formatted JSON object with:
{
  "improvedTagline": "A punchy, professional value proposition tagline",
  "missingEdgeCases": ["detailed edge case 1", "detailed edge case 2", "detailed edge case 3"],
  "technicalRecommendations": ["architecture advice 1", "security recommendation 2", "state management tip 3"],
  "suggestedAcceptanceCriteria": ["Given/When/Then scenario 1", "Given/When/Then scenario 2", "Given/When/Then scenario 3"],
  "antiPatternsToAvoid": ["Anti-pattern 1 to avoid", "Anti-pattern 2 to avoid"]
}
Only output valid JSON. No conversational fluff or markdown code fence.`;

      userPrompt = `Product Name: ${prdData?.appName || 'Untitled'}
Category: ${prdData?.category || 'General'}
Problem Statement: ${prdData?.problemStatement || 'Not specified'}
Target Users: ${prdData?.targetAudience || 'General users'}
Core Features: ${JSON.stringify(prdData?.coreFeatures || [])}
Tech Stack: ${JSON.stringify(prdData?.techStack || {})}`;

    } else if (action === 'sharpen_prompt') {
      systemInstruction = `You are a World-Class AI Prompt Architect specializing in LLM code-generation prompts for models like ${targetAiModel || 'Claude 3.7 / Gemini 3.8 / GPT-4o'}.
Your task is to take this PRD data and generate an ultra-sharp, structured prompt in ${language === 'id' ? 'Bahasa Indonesia' : 'English'} that forces the AI coding model to produce accurate, bug-free, complete code without hallucination.
Format the output cleanly with XML tags (<role>, <context>, <specifications>, <technical_constraints>, <anti_patterns>, <acceptance_checklist>).`;

      userPrompt = `PRD Summary:
Product: ${prdData?.appName} - ${prdData?.tagline}
Stack: Frontend: ${prdData?.techStack?.frontend}, Backend: ${prdData?.techStack?.backend}, DB: ${prdData?.techStack?.database}
Core Features: ${JSON.stringify(prdData?.coreFeatures || [])}
Key Constraints: ${JSON.stringify(prdData?.nonFunctional || [])}
Edge cases: ${JSON.stringify(prdData?.edgeCases || [])}
Prompt Style Requested: ${promptStyle || 'mega_prompt'}`;
    } else {
      return res.status(400).json({ error: 'Unknown action specified' });
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const text = response.text || '';
    let parsedJson = null;
    if (action === 'enrich_prd') {
      try {
        const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
        parsedJson = JSON.parse(cleaned);
      } catch {
        parsedJson = null;
      }
    }

    res.json({
      success: true,
      text,
      data: parsedJson,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error processing AI request',
    });
  }
});

// Setup Vite in Dev or Static Serve in Production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, '../dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SpecCraft server running on port ${PORT} (isProduction=${isProduction})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
