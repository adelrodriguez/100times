import { anonymousClient, inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import type { Auth } from "~/shared/auth/server"
import env from "~/shared/env/client"

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  plugins: [anonymousClient(), inferAdditionalFields<Auth>()],
})

export const { signIn, signOut, signUp, useSession } = authClient
