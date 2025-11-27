import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import Providers from "@/components/Providers"
import "./globals.css"

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-nunito" })

export const metadata: Metadata = {
    title: "test_react",
    description: "product app",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${nunito.variable} antialiased`}>
                <div className="container mx-auto">
                    <Providers>{children}</Providers>
                </div>
            </body>
        </html>
    )
}
