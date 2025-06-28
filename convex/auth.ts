import Apple from "@auth/core/providers/apple"
import Google from "@auth/core/providers/google"
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server"
import { query } from "./_generated/server"

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Google, Apple],
})

export const currentUser = query({
  handler: async ctx => {
    const userId = await getAuthUserId(ctx)

    if (!userId) {
      return null
    }

    return ctx.db
      .query("users")
      .withIndex("by_id", q => q.eq("_id", userId))
      .first()
  },
})
