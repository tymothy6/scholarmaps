import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import NextAuthProvider from '@/components/session-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    template: '%s | Scholar Maps',
    default: 'Scholar Maps',
  },
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
        <NextAuthProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
          </ThemeProvider>
        </NextAuthProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
