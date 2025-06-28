import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Providers from "~/shared/components/providers"

import "~/shared/styles/globals.css"
import { cn } from "~/shared/utils/cn"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "100times",
  description: "Work on systems, not goals. Develop habits by repetition, one hundred times.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", geistSans.variable, geistMono.variable)}>
        <Providers>
          <div className="flex flex-col min-h-screen max-w-4xl mx-auto p-4">
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
