import { defineType } from 'sanity'
export default defineType({name:'colorTheme',title:'Color Theme',type:'object',fields:[{name:'name',type:'string'},{name:'primary',type:'color'},{name:'secondary',type:'color'},{name:'accent',type:'color'}]})
