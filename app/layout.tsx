// app/layout.tsx
import './globals.css'
import type { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from "@/components/Footer"
import LenisProvider from "@/app/providers/LenisProvider"
import { inter, jomolhari, suseMono } from './fonts' // self-hosted font vars

export const metadata = {
  title: 'ELDR MEDIA',
  description: 'Design systems & strategy',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jomolhari.variable} ${suseMono.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <LenisProvider>
        <Header />
          <main className="flex-grow">{children}</main>
        <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}


