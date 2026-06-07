import { BRAND_NAME } from "@/lib/branding";
import type React from "react"
import "@/app/globals.css"
import { Playfair_Display, Inter, Cinzel } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Toaster } from "@/components/ui/toaster"

// Modern Classic Font Combination
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
})

export const metadata = {
  title: "BRAND_NAME - Discover Your Cosmic Path",
  description: "Expert astrological guidance to illuminate your journey and reveal the possibilities that await you.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${inter.variable} ${cinzel.variable}`}
    >
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollToTop />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
