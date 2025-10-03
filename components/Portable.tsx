// components/Portable.tsx
import { PortableText, type PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-8">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic text-neutral-700">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="leading-7">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-2">{children}</ol>,
  },
}

export default function RichText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
}
