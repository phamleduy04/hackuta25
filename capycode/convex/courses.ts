import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCourse = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        prompt: v.string(),
        logoURL: v.string(),
    },
    returns: v.id("courses"),
    handler: async (ctx, args) => {
        return await ctx.db.insert("courses", args);
    },
});

export const getCourses = query({
    args: {},
    returns: v.array(v.object({
        _id: v.id("courses"),
        name: v.string(),
        description: v.string(),
        prompt: v.string(),
        logoURL: v.string(),
    })),
    handler: async (ctx) => {
        return await ctx.db.query("courses").collect();
    },
});