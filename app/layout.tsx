import "./globals.css"

import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query" // Import the missing QueryClientProvider

import { CookiesProvider } from "next-client-cookies/server"

import { Toaster } from "@/components/ui/toaster"

import Providers from "./provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next-Admin-shadcn-ui",
  description: "A Admin Uses shadcn-ui",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <CookiesProvider>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </CookiesProvider>
      </body>
    </html>
  )
}
