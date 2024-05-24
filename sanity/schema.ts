import { type SchemaTypeDefinition } from 'sanity'
import product from './schemas/product'
import heroSection from './schemas/heroSection'
import category from './schemas/category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,heroSection,category],
}
