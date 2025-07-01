import { api } from "@100times/core/convex/api"
import { useAuthActions } from "@convex-dev/auth/react"
import { useQuery } from "convex/react"
import { SafeAreaView, View } from "react-native"
import SignInWithAppleButton from "~/features/auth/components/sign-in-with-apple"
import SignInWithGoogleButton from "~/features/auth/components/sign-in-with-google"
import { Button } from "~/shared/components/ui/button"
import { Text } from "~/shared/components/ui/text"

export default function Screen() {
  const user = useQuery(api.auth.getCurrentUser)
  const { signOut } = useAuthActions()

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View>
          <Text>{JSON.stringify(user)}</Text>
        </View>
        <SignInWithGoogleButton />
        <SignInWithAppleButton />
        <Button onPress={() => signOut()}>
          <Text>Sign Out</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}
