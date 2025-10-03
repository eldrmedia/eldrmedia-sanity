import { defineType } from 'sanity'
export default defineType({
  name: 'testimonialModule',
  title: 'Testimonial',
  type: 'object',
  fields: [
    { name:'superTitle', type:'string', title:'Super title (eyebrow)' },
    { name:'title', type:'string' },
    { name:'subtitle', type:'text' },
    { name:'bg', type:'string', description:'Tailwind background class or hex' },
    { name:'testimonial', type:'testimonial' }
  ].filter(Boolean)
})
