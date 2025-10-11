// app/layout.tsx
import './globals.css'
import type { ReactNode } from 'react'
import Header from '@/components/Header'
import { inter, jomolhari, suseMono } from './fonts' // self-hosted font vars

export const metadata = {
  title: 'ELDR MEDIA',
  description: 'Design systems & strategy',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jomolhari.variable} ${suseMono.variable}`}>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  )
}


