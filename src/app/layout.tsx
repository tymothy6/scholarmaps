import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'

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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >{children}
        </ThemeProvider>
      </body>
    </html>
  )
}
