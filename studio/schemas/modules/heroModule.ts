import { defineType } from 'sanity'
export default defineType({
  name: 'heroModule',
  title: 'Hero',
  type: 'object',
  fields: [
    { name:'superTitle', type:'string', title:'Super title (eyebrow)' },
    { name:'title', type:'string' },
    { name:'subtitle', type:'text' },
    { name:'bg', type:'string', description:'Tailwind background class or hex' },
    { name:'media', type:'image' }, { name:'actions', type:'array', of:[{ type:'cta' }] },
  ].filter(Boolean)
})
