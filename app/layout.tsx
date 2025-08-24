import type { Metadata } from "next"
import React from "react"
import { LanguageProvider } from "../contexts/language-context"
import './globals.css'

export const metadata: Metadata = {
  title: "Manuel Montero - Front End Engineer",
  description: "Portfolio of Manuel Montero, Front End Engineer specializing in React, Vue, Flutter, and SwiftUI development",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/placeholder-logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/placeholder-logo.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/placeholder-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}