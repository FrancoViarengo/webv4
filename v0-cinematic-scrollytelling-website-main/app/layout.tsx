import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Shippori_Mincho, Courier_Prime, Nanum_Myeongjo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const shippori = Shippori_Mincho({
  weight: ["400", "500", "800"],
  subsets: ["latin"],
  variable: "--font-mincho", // Re-purposing or keeping separate? Let's keep separate for clarity
})

const nanum = Nanum_Myeongjo({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-nanum",
})

const courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-typewriter",
})

export const metadata: Metadata = {
  title: "THE ANCIENT EAST | A Cinematic Journey Through Japan & Korea",
  description: "An immersive scrollytelling experience exploring the landscapes, culture, and quiet beauty of Japan and Korea.",
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0f0f14",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${shippori.variable} ${nanum.variable} ${courier.variable}`}
      suppressHydrationWarning
    >
      <body className="font-serif antialiased bg-background text-foreground overflow-x-hidden">
        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div className="relative w-full overflow-x-hidden">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
