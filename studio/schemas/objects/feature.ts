// studio/schemas/objects/feature.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', type: 'text' }),

    // Optional: keep old text icon (bootstrap name) if you want
    defineField({ name: 'icon', type: 'string', description: 'Unused if SVG is provided' }),

    // Paste raw <svg>…</svg>
    defineField({
      name: 'svg',
      title: 'SVG Code',
      type: 'text',
      rows: 6,
      description:
        'Paste inline <svg>…</svg>. Use currentColor for fill/stroke so it inherits text color.',
    }),

    // Optional styling helpers (Tailwind classes)
    defineField({
      name: 'iconSize',
      title: 'Icon size (Tailwind)',
      type: 'string',
      initialValue: 'h-6 w-6',
      description: 'e.g. h-6 w-6, h-8 w-8, text-2xl',
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon color (Tailwind)',
      type: 'string',
      initialValue: 'text-current',
      description: 'e.g. text-current, text-neutral-800, text-sun-700',
    }),
  ],
})
