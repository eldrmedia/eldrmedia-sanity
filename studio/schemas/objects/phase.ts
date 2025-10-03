import { defineType } from 'sanity'
export default defineType({name:'phase',title:'Process Phase',type:'object',fields:[{name:'title',type:'string'},{name:'activities',type:'array',of:[{type:'string'}]},{name:'artifacts',type:'array',of:[{type:'string'}]},{name:'outcome',type:'text'}]})
