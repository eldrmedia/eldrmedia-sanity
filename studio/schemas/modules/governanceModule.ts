import { defineType } from 'sanity'
export default defineType({
  name: 'governanceModule',
  title: 'Governance & Roadmap',
  type: 'object',
  fields: [
    { name:'superTitle', type:'string', title:'Super title (eyebrow)' },
    { name:'title', type:'string' },
    { name:'subtitle', type:'text' },
    { name:'bg', type:'string', description:'Tailwind background class or hex' },
    { name:'quarters', type:'array', of:[{ type:'object', fields:[{name:'quarter',type:'string'},{name:'title',type:'string'},{name:'description',type:'text'}]}] }
  ].filter(Boolean)
})
