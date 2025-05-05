import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LinkTreeProvider } from "@/contexts/linktree-context"
import { ThemeProvider } from "@/contexts/theme-context"
import Middleware from "./middleware"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LinkForest | Create Your Digital Presence",
  description: "A modern and customizable link management platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system">
          <LinkTreeProvider>
            <Middleware>{children}</Middleware>
          </LinkTreeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
