import { Analytics } from '@vercel/analytics/react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Container } from '@/components/container'
import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vitor Hugo Oliveira',
  description:
    'I am a software developer, technology enthusiast, and very practical. Currently, I work in the development team at Athenas Consultoria Agrícola e Laboratórios, where I build tools and plugins focused on precision agriculture. I use Python, TypeScript, QGIS, and ArcGIS in the development of these solutions.',
  keywords: [
    'Software developer',
    'Technology',
    'Athenas Consultoria Agrícola e Laboratórios',
    'Precision agriculture',
    'Python',
    'TypeScript',
    'QGIS',
    'ArcGIS',
    'Tools and plugins',
    'Solution development',
    'Software development',
    'Portfolio',
  ],
  creator: 'Vitor Hugo Oliveira <vitor_osantos@hotmail.com>',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-background text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Container>
            <div className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
              <Header />
              <main className="flex-1">
                {children}
                <Analytics />
              </main>
            </div>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
