import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import './prosemirror.css'

import { ReactQueryProvider } from '@/components/query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import NextAuthProvider from '@/components/session-provider'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/react'

const hubotSans = localFont({
  src: './Hubot-Sans.woff2',
  display: 'swap',
  variable: '--font-hubot-sans',
})

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
      <html lang="en" className={`${hubotSans.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
        <body className={GeistSans.className}>
            <ReactQueryProvider>
              <NextAuthProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                  >
                    {children}
                    <Analytics />
                </ThemeProvider>
              </NextAuthProvider>
              <Toaster richColors position="top-center" />
            </ReactQueryProvider>
        </body>
      </html>
  )
}
