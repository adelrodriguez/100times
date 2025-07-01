import { withSentry } from "@sentry/react-native/expo"
import type { ConfigContext, ExpoConfig } from "expo/config"

const APP_ID = "times100"
const APP_NAME = "100times"
const APP_BUNDLE_ID = "io.metaideas.times100"

let expoConfig: ExpoConfig = {
  android: {
    package: APP_BUNDLE_ID,
    adaptiveIcon: {
      backgroundColor: "#ffffff",
      foregroundImage: "./src/shared/assets/images/adaptive-icon.png",
    },
  },
  experiments: {
    typedRoutes: true,
  },
  icon: "./src/shared/assets/images/icon.png",
  ios: {
    bundleIdentifier: APP_BUNDLE_ID,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    privacyManifests: {
      NSPrivacyAccessedAPITypes: [
        {
          NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
          NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
        },
        {
          NSPrivacyAccessedAPIType:
            "NSPrivacyAccessedAPICategorySystemBootTime",
          NSPrivacyAccessedAPITypeReasons: ["35F9.1"],
        },
        {
          NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryFileTimestamp",
          NSPrivacyAccessedAPITypeReasons: ["C617.1"],
        },
      ],
      // Required for Sentry to work:
      NSPrivacyCollectedDataTypes: [
        {
          NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypeCrashData",
          NSPrivacyCollectedDataTypeLinked: false,
          NSPrivacyCollectedDataTypePurposes: [
            "NSPrivacyCollectedDataTypePurposeAppFunctionality",
          ],
          NSPrivacyCollectedDataTypeTracking: false,
        },
        {
          NSPrivacyCollectedDataType:
            "NSPrivacyCollectedDataTypePerformanceData",
          NSPrivacyCollectedDataTypeLinked: false,
          NSPrivacyCollectedDataTypePurposes: [
            "NSPrivacyCollectedDataTypePurposeAppFunctionality",
          ],
          NSPrivacyCollectedDataTypeTracking: false,
        },
        {
          NSPrivacyCollectedDataType:
            "NSPrivacyCollectedDataTypeOtherDiagnosticData",
          NSPrivacyCollectedDataTypeLinked: false,
          NSPrivacyCollectedDataTypePurposes: [
            "NSPrivacyCollectedDataTypePurposeAppFunctionality",
          ],
          NSPrivacyCollectedDataTypeTracking: false,
        },
      ],
    },
    supportsTablet: true,
  },
  name: APP_NAME,
  newArchEnabled: true,
  orientation: "portrait",
  plugins: [
    "expo-font",
    "expo-router",
    "expo-web-browser",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#ffffff",
        image: "./src/shared/assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
      },
    ],
    [
      "expo-dev-client",
      {
        launcherMode: "most-recent",
      },
    ],
  ],
  scheme: APP_ID,
  slug: APP_ID,
  userInterfaceStyle: "automatic",
  version: "1.0.0",
  web: {
    bundler: "metro",
    favicon: "./src/shared/assets/images/favicon.png",
    output: "static",
  },
  extra: {
    eas: {
      projectId: "31c6d602-965b-4a19-a82b-3ce97f244581",
    },
  },
  owner: "metaideas",
}

expoConfig = withSentry(expoConfig, {
  organization: process.env.EXPO_PUBLIC_SENTRY_ORG,
  project: process.env.EXPO_PUBLIC_SENTRY_PROJECT,
  url: process.env.EXPO_PUBLIC_SENTRY_URL,
})

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  ...expoConfig,
})
