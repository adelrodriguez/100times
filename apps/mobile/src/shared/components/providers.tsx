import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { ConvexReactClient } from "convex/react"
import * as SecureStore from "expo-secure-store"
import type { ReactNode } from "react"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { SafeAreaProvider } from "react-native-safe-area-context"
import ThemeProvider from "~/shared/components/theme-provider"
import env from "~/shared/env"

const convex = new ConvexReactClient(env.EXPO_PUBLIC_CONVEX_URL)

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthProvider
      client={convex}
      storage={{
        removeItem: SecureStore.deleteItemAsync,
        getItem: SecureStore.getItem,
        setItem: SecureStore.setItem,
      }}
    >
      <KeyboardProvider navigationBarTranslucent statusBarTranslucent>
        <ThemeProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </ConvexAuthProvider>
  )
}
