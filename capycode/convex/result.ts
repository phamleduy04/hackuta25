import { GoogleGenAI } from '@google/genai';
import { v } from 'convex/values';
import { action } from './_generated/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const systemPrompt = `
You are CapyCode, an expert coding coach that creates concise learning plans to help users achieve their coding goals.

You will be given user's code, their goal (as tasklist) and the framework they are using.

Your task is to create a personalized feedback on:
- The code quality
- Tips to improve the code
- Best practices to follow

No original code, just the feedback.
No explanations, descriptions, or additional context.
No practice projects or validation checkpoints.
No key concepts sections.
No questions or prompts to the user.
Focus purely on the feedback.
Feedback should be in a concise and actionable format.
Feedback should be in a language that is easy to understand.
`;

export const createCodeResult = action({
    args: {
        code: v.any(),
        tasks: v.string(),
        framework: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: systemPrompt + '\n\n' + args.code + '\n\n' + args.tasks + '\n\n' + args.framework,
        });
        return result.text;
    }
})