import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // if you render Sanity Portable Text components or modules here:
    './lib/**/*.{js,ts,jsx,tsx}',
    // if you keep React components inside /studio for previews:
    './studio/**/*.{js,ts,jsx,tsx}',
  ],
  theme: { extend: {
    fontFamily: {
      body: ['var(--font-body)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      heading: ['var(--font-heading)', 'Georgia', 'serif'],
      eyelash: ['var(--font-eyelash)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },    
    colors: {
      sun: {
        50:'var(--sun-50,#FFFAEB)',100:'var(--sun-100,#FEF0C7)',200:'var(--sun-200,#FCDE8B)',
        300:'var(--sun-300,#FBC84E)',400:'var(--sun-400,#F9AD19)',500:'var(--sun-500,#F3900D)',
        600:'var(--sun-600,#D76B08)',700:'var(--sun-700,#B3490A)',800:'var(--sun-800,#91380F)',
        900:'var(--sun-900,#772F10)',950:'var(--sun-950,#441604)',
      },
      neutral: {
        50:'var(--neutral-50,#FAFAFA)',100:'var(--neutral-100,#F4F4F5)',200:'var(--neutral-200,#E4E4E7)',
        300:'var(--neutral-300,#D4D4D8)',400:'var(--neutral-400,#A1A1AA)',500:'var(--neutral-500,#71717A)',
        600:'var(--neutral-600,#52525B)',700:'var(--neutral-700,#3F3F46)',800:'var(--neutral-800,#27272A)',
        900:'var(--neutral-900,#18181B)',950:'var(--neutral-950,#0B0B0C)',
      }
    },
    borderRadius:{xl:'1rem','2xl':'1.25rem'},
    boxShadow:{card:'0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.06)'}
  } },
  plugins: []
}
export default config
