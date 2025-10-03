// e.g., in /studio/schemas/modules/shared/bg.ts
export const bgField = {
  name: 'bg',
  title: 'Background',
  type: 'object',
  fields: [
    {
      name: 'mode',
      title: 'Mode',
      type: 'string',
      options: {
        list: [
          {title: 'Token (Tailwind class)', value: 'token'},
          {title: 'Custom color (picker)', value: 'custom'},
        ],
        layout: 'radio',
      },
      initialValue: 'token',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'token',
      title: 'Design token',
      type: 'string',
      options: {
        list: [
          // Neutral
          {title: 'bg-white', value: 'bg-white'},
          {title: 'bg-neutral-50', value: 'bg-neutral-50'},
          {title: 'bg-neutral-100', value: 'bg-neutral-100'},
          {title: 'bg-neutral-200', value: 'bg-neutral-200'},
          {title: 'bg-neutral-900', value: 'bg-neutral-900'},
          // Sun (your brand scale)
          {title: 'bg-sun-50', value: 'bg-sun-50'},
          {title: 'bg-sun-100', value: 'bg-sun-100'},
          {title: 'bg-sun-200', value: 'bg-sun-200'},
          {title: 'bg-sun-300', value: 'bg-sun-300'},
          {title: 'bg-sun-400', value: 'bg-sun-400'},
          {title: 'bg-sun-500', value: 'bg-sun-500'},
        ],
      },
      hidden: ({parent}) => parent?.mode !== 'token',
    },
    {
      name: 'custom',
      title: 'Custom color',
      type: 'color',               // ← provided by @sanity/color-input
      options: { disableAlpha: false }, // allow transparency if you want
      hidden: ({parent}) => parent?.mode !== 'custom',
    },
  ],
  preview: {
    select: {mode: 'mode', token: 'token', hex: 'custom.hex'},
    prepare: ({mode, token, hex}) => ({
      title: mode === 'token' ? (token || '—') : (hex || 'Custom color'),
    }),
  },
}
