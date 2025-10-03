import { defineType } from 'sanity'
export default defineType({ name:'testimonial', title:'Testimonial', type:'object',
  fields:[{name:'quote', type:'text'},{name:'person', type:'string'},{name:'role', type:'string'},{name:'rating', type:'number'}] })
