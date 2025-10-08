// app/fonts.ts
import localFont from 'next/font/local'

export const inter = localFont({
  src: [{ path: '../public/fonts/inter/Inter-Variable.woff2', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
})

export const jomolhari = localFont({
  src: [{ path: '../public/fonts/jomolhari/Jomolhari-Regular.woff2', weight: '400', style: 'normal' }],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
  fallback: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
})

export const suseMono = localFont({
  src: [{ path: '../public/fonts/suse-mono/SuseMono-Variable.woff2', style: 'normal' }],
  variable: '--font-eyelash',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
})
