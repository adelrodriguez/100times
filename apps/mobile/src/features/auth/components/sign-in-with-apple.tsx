import { useAuthActions } from "@convex-dev/auth/react"
import { Ionicons } from "@expo/vector-icons"
import { makeRedirectUri } from "expo-auth-session"
import { openAuthSessionAsync } from "expo-web-browser"
import { useState } from "react"
import { Platform } from "react-native"
import { Button } from "~/shared/components/ui/button"
import { Text } from "~/shared/components/ui/text"

const redirectTo = makeRedirectUri()

export default function SignInWithAppleButton() {
  const { signIn } = useAuthActions()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handlePress() {
    setIsSubmitting(true)

    try {
      const { redirect } = await signIn("apple", {
        redirectTo,
      })

      if (Platform.OS === "web") {
        return
      }

      const result = await openAuthSessionAsync(
        redirect?.toString() ?? "",
        redirectTo
      )

      console.log("result", { result })

      if (result.type !== "success") {
        setIsSubmitting(false)
        return
      }

      const { url } = result
      const code = new URL(url).searchParams.get("code")

      if (!code) {
        setIsSubmitting(false)
        return
      }

      await signIn("apple", { code })
    } catch (error) {
      console.error("Apple Sign-In error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button
      className="gap-1 ios:bg-foreground/10"
      disabled={isSubmitting}
      onPress={handlePress}
      size={Platform.select({ ios: "lg", default: "md" })}
      variant="primary"
    >
      <Ionicons name="logo-apple" style={{ fontSize: 16 }} />
      <Text className="ios:text-foreground">Sign in with Apple</Text>
    </Button>
  )
}
