import type { Metadata } from 'next'

import {
  Geist,
  Geist_Mono,
} from 'next/font/google'

import './globals.css'

import { Toaster } from 'sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PesanOnline - Pesan Lebih Cepat Tanpa Ribet',
  description:
    'PesanOnline membantu bisnis menerima pesanan, pembayaran digital, notifikasi realtime, dan pengiriman lebih cepat dalam satu tempat.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}

        <Toaster
          richColors
          position="top-right"
        />
      </body>
    </html>
  )
}