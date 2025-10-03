import { defineType } from 'sanity'
export default defineType({ name:'cta', title:'CTA', type:'object',
  fields:[{name:'eyebrow',type:'string'},{name:'title',type:'string'},{name:'body',type:'text'},{name:'label',type:'string'},{name:'href',type:'string'},{name:'bg',type:'string'}] })
