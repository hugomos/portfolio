import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vitor Hugo Oliveira | Portfolio',
  description:
    "Explore my portfolio showcasing my expertise in web development, application design, and creative problem-solving. Get a glimpse of how I turn ideas into digital reality and let's collaborate to bring your visions to life!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen w-full flex justify-center items-center dark:bg-github-900">
          {children}
        </main>
      </body>
    </html>
  )
}
