import './globals.css'
import type { ReactNode } from 'react'
import Header from '@/components/Header'
import { Inter, Jomolhari,  } from 'next/font/google' // <- Google fonts

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const jomolhari = Jomolhari({ weight: '400', subsets: ['latin'], variable: '--font-heading', display: 'swap' })

export const metadata = { title: 'ELDR MEDIA', description: 'Design systems & strategy' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jomolhari.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
