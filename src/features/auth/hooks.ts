import { useEffect } from "react"
import { authClient, useSession } from "~/shared/auth/client"

export function useAnonymousAccount() {
  const session = useSession()

  useEffect(() => {
    if (session.isPending) {
      return
    }

    if (session.data) {
      return
    }

    authClient.signIn.anonymous()
  }, [session])
}
