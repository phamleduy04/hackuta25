import { v } from "convex/values";
import { action } from "./_generated/server";

export const createCoachingPlan = action({
    args: {
        goal: v.string(),
        framework: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await fetch(`${process.env.AGENTUITY_API_URL}`, {
            method: 'POST',
            body: JSON.stringify({
                goal: args.goal,
                framework: args.framework,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AGENTUITY_API_KEY}`,
            },
        });
        return result.text();
    },
});