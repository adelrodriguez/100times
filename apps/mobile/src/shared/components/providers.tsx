import type { ReactNode } from "react"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { SafeAreaProvider } from "react-native-safe-area-context"
import ThemeProvider from "~/shared/components/theme-provider"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <KeyboardProvider navigationBarTranslucent statusBarTranslucent>
      <ThemeProvider>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </ThemeProvider>
    </KeyboardProvider>
  )
}
