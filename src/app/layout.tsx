import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import ClarityInit from "@/components/ClarityInit"
import { GoogleTagManager } from "@next/third-parties/google"
import { analyticsConfig } from "@/config/analytics"
import { ToastContainer } from "react-toastify"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

export const metadata: Metadata = {
  title: "Clarivia",
  description: "Clarivia - Clear Nails in 12 Weeks",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          src="https://click.clicktrackingforclarivia.com/uniclick.js?attribution=lastpaid&cookiedomain=&cookieduration=90&defaultcampaignid=68471dddd7fd273b14785507&regviewonce=false"
          async
        />
      </head>
      <body>
        <ClarityInit />
        <ToastContainer theme="colored" hideProgressBar />
        <GoogleTagManager gtmId={analyticsConfig.gtmTag} />
        {children}
      </body>
    </html>
  )
}
