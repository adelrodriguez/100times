import { getAuthUserId } from "@convex-dev/auth/server"
import { mutation, query } from "convex/_generated/server"
import { v } from "convex/values"

export const list = query({
  handler: async ctx => {
    const userId = await getAuthUserId(ctx)

    if (!userId) {
      return []
    }

    return ctx.db
      .query("userTasks")
      .withIndex("by_user", q => q.eq("userId", userId))
      .collect()
  },
})

export const getById = query({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
  },
})
