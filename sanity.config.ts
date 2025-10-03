import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './studio/schemas'

export default defineConfig({
  name: 'eldr-studio',
  title: 'ELDR Media Studio',
  projectId: 'obf9pub6',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool(), colorInput()],
  schema: { types: schemaTypes }
})
