import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'
import { ButtonClickProvider } from '@/contexts/buttonClickContext'
import { AuthProvider } from '@/contexts/authContext'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'SingSpot',
  description: 'Karaoke app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <AuthProvider>
          <ButtonClickProvider>
            <Header />
            {children}
            <Footer />
          </ButtonClickProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
