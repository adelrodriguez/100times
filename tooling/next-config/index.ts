import bundleAnalyzer from "@next/bundle-analyzer"
import type { NextConfig } from "next"

export function createConfig(config: NextConfig = {}): NextConfig {
  return {
    ...config,
    serverExternalPackages: ["pino", "@axiomhq/pino"],
    transpilePackages: [
      "@100times/ai",
      "@100times/analytics",
      "@100times/auth",
      "@100times/db",
      "@100times/email",
      "@100times/env",
      "@100times/internationalization",
      "@100times/kv",
      "@100times/observability",
      "@100times/queue",
      "@100times/security",
      "@100times/ui",
      "@100times/utils",
    ],
  }
}

export const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})
