import { defineType } from 'sanity'
export default defineType({name:'milestone',title:'Milestone',type:'object',fields:[{name:'quarter',type:'string'},{name:'title',type:'string'},{name:'owner',type:'string'}]})
