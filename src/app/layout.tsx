import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'ScholarMaps',
  description: 'Full-stack literature search & visualization with Semantic Scholar.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
