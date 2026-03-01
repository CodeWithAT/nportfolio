import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import experience from './experience'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, experience],
}