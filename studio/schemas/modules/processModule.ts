import { defineType } from 'sanity'
export default defineType({
  name: 'processModule',
  title: 'Process (Phases)',
  type: 'object',
  fields: [
    { name:'superTitle', type:'string', title:'Super title (eyebrow)' },
    { name:'title', type:'string' },
    { name:'subtitle', type:'text' },
    { name:'bg', type:'string', description:'Tailwind background class or hex' },
    { name:'phases', type:'array', of:[{ type:'phase' }] }
  ].filter(Boolean)
})
