import type { NextConfig } from "next"

// Verify environment variables are set during build time
import "~/shared/env/server"
import "~/shared/env/client"

const nextConfig = {
  /* config options here */
} satisfies NextConfig

export default nextConfig
