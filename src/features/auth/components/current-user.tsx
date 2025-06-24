"use client"

import { User } from "lucide-react"
import { useState } from "react"
import { useAnonymousAccount } from "~/features/auth/hooks"
import { signIn, signOut, useSession } from "~/shared/auth/client"
import { Avatar, AvatarFallback, AvatarImage } from "~/shared/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu"
import { Skeleton } from "~/shared/components/ui/skeleton"

export default function CurrentUser() {
  const [loading, setLoading] = useState(false)
  const { data: session, isPending } = useSession()

  useAnonymousAccount()

  if (isPending) {
    return <Skeleton className="w-8 h-8 rounded-full" />
  }

  if (session?.user.isAnonymous) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>
              <User size={20} />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Sign in</DropdownMenuLabel>

          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await signIn.social(
                {
                  provider: "google",
                  callbackURL: "/",
                },
                {
                  onRequest: () => {
                    setLoading(true)
                  },
                  onResponse: () => {
                    setLoading(false)
                  },
                },
              )
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.98em"
              height="1em"
              viewBox="0 0 256 262"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            Sign in with Google
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await signIn.social(
                {
                  provider: "apple",
                  callbackURL: "/",
                },
                {
                  onRequest: () => {
                    setLoading(true)
                  },
                  onResponse: () => {
                    setLoading(false)
                  },
                },
              )
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
              ></path>
            </svg>
            Sign in with Apple
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const image = session?.user.image ?? undefined

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>
            <User size={20} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="text-sm font-medium">{session?.user.name}</span>
          <span className="text-xs text-muted-foreground">{session?.user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
