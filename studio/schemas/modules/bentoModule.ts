import { defineType } from 'sanity'
export default defineType({
  name: 'bentoModule',
  title: 'Selected Works (Bento)',
  type: 'object',
  fields: [
    { name:'superTitle', type:'string', title:'Super title (eyebrow)' },
    { name:'title', type:'string' },
    { name:'subtitle', type:'text' },
    { name:'bg', type:'string', description:'Tailwind background class or hex' },
    { name:'projects', type:'array', of:[{ type:'reference', to:[{type:'project'}]}] }
  ].filter(Boolean)
})
