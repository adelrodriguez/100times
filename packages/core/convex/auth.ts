import Apple from "@auth/core/providers/apple"
import Google from "@auth/core/providers/google"
import { Anonymous } from "@convex-dev/auth/providers/Anonymous"
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server"
import { query } from "./_generated/server"

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google,
    Apple({
      profile: (info) => {
        const name = info.user
          ? `${info.user.name.firstName} ${info.user.name.lastName}`
          : undefined
        return {
          id: info.sub,
          name,
          email: info.email,
        }
      },
    }),
    Anonymous,
  ],
  callbacks: {
    // @ts-expect-error - We aren't making any async calls here
    redirect: ({ redirectTo }) => {
      if (
        redirectTo !== process.env.EXPO_URL &&
        redirectTo !== process.env.SITE_URL
      ) {
        throw new Error(`Invalid redirectTo URI ${redirectTo}`)
      }
      return redirectTo
    },
  },
})

export const getCurrentUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)

    if (!userId) {
      return null
    }

    return ctx.db
      .query("users")
      .withIndex("by_id", (q) => q.eq("_id", userId))
      .first()
  },
})
