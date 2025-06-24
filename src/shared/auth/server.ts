import "server-only"

import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { anonymous } from "better-auth/plugins"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { cache } from "react"
import { APP_ID } from "~/shared/constants"
import db from "~/shared/db"
import { checkIns, tasks, type UserId } from "~/shared/db/schema"
import env from "~/shared/env/server"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    usePlural: true,
  }),
  basePath: "/api/auth",
  baseURL: env.BASE_URL,
  advanced: {
    database: {
      generateId: false,
    },
    cookiePrefix: APP_ID,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 100, // 100 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  emailAndPassword: {
    enabled: false,
  },
  user: {
    additionalFields: {
      timezone: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["apple", "google"],
      allowDifferentEmails: true,
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    apple: {
      clientId: env.APPLE_CLIENT_ID,
      clientSecret: env.APPLE_CLIENT_SECRET,
      appBundleIdentifier: env.APPLE_APP_BUNDLE_IDENTIFIER,
    },
  },
  plugins: [
    anonymous({
      emailDomainName: "anonymous.100times.app",
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        console.info("Migrating data from anonymous user to permanent user", {
          anonymousUserId: anonymousUser.user.id,
          newUserId: newUser.user.id,
        })

        // Use transaction to ensure atomicity of data migration
        await db.transaction(async tx => {
          // Transfer tasks from anonymous user to new user
          await tx
            .update(tasks)
            .set({ ownerId: newUser.user.id as UserId })
            .where(eq(tasks.ownerId, anonymousUser.user.id as UserId))

          // Transfer check-ins from anonymous user to new user
          await tx
            .update(checkIns)
            .set({ userId: newUser.user.id as UserId })
            .where(eq(checkIns.userId, anonymousUser.user.id as UserId))
        })

        console.info("Successfully migrated data from anonymous user to permanent user", {
          anonymousUserId: anonymousUser.user.id,
          newUserId: newUser.user.id,
        })
      },
    }),

    nextCookies(),
  ],
})

export type Auth = typeof auth
export type Session = typeof auth.$Infer.Session

export const validateRequest = cache(async (): Promise<Session | null> => {
  const result = await auth.api.getSession({
    headers: await headers(),
  })

  if (!result) {
    return null
  }

  return result
})
