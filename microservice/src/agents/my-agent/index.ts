import type { AgentContext, AgentRequest, AgentResponse } from '@agentuity/sdk';
import { GoogleGenAI } from '@google/genai';

// TODO: Add your key via `agentuity env set --secret GOOGLE_API_KEY`
// Get your API key here: https://aistudio.google.com/apikey
if (!process.env.GOOGLE_API_KEY) {
  console.error('Missing the GOOGLE_API_KEY environment variable');

  process.exit(1);
}

const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const welcome = () => {
  return {
    welcome:
      'Welcome to the Google AI TypeScript Agent! I can help you build AI-powered applications using Gemini models.',
    prompts: [
      {
        data: 'How do I implement streaming responses with Gemini models?',
        contentType: 'text/plain',
      },
      {
        data: 'What are the best practices for prompt engineering with Gemini?',
        contentType: 'text/plain',
      },
    ],
  };
};

const systemPrompt = `
CORE IDENTITY:
You are CapyCode, an expert coding coach that creates concise learning plans to help users achieve their coding goals.

INPUT REQUIREMENTS:
You will receive:
- A specific coding goal the user wants to achieve
- A JavaScript framework to focus on (e.g., React, Vue, Angular, Node.js)

ASSUMPTIONS:
- The project environment is already set up
- The main App component exists
- The user has basic knowledge of the framework

OUTPUT FORMAT:
Return a numbered task list organized by stages. Each stage should:
- Have a clear title describing the focus area
- List 3-6 specific, actionable tasks
- Progress from simple to complex

Keep tasks brief and direct - just what needs to be done.

GUIDELINES:
- No explanations, descriptions, or additional context
- No practice projects or validation checkpoints
- No key concepts sections
- No questions or prompts to the user
- Focus purely on the sequential tasks needed to complete the goal
- Tasks should build upon each other logically

RESTRICTIONS:
- Do NOT provide code or implementations
- Do NOT include time estimates
- Do NOT ask clarifying questions or add commentary
`;

export default async function Agent(
  req: AgentRequest,
  resp: AgentResponse,
  ctx: AgentContext
) {
  try {
    const goal = await req.data.text();

    if (!goal) {
      return resp.text('No goal provided');
    }

    console.log('Prompt context:', goal);

    const result = await client.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: systemPrompt + '\n\n' + goal,
    });

    return resp.stream(result, 'text/plain', undefined, (chunk) => {
      // Extract just the text content from Gemini's response format
      if (chunk.candidates?.[0]?.content?.parts?.[0]?.text) {
        return chunk.candidates[0].content.parts[0].text;
      }
      return null;
    });

  } catch (error) {
    ctx.logger.error('Error running agent:', error);

    return resp.text('Sorry, there was an error processing your request.');
  }
}
