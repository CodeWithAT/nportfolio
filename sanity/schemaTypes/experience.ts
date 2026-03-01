import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'My Experience',
  type: 'document',
  fields: [
    defineField({ name: 'company', type: 'string', title: 'Company Name' }),
    defineField({ name: 'role', type: 'string', title: 'Role/Position' }),
    defineField({ name: 'period', type: 'string', title: 'Duration (e.g. Mar 2025 - May 2025)' }),
    defineField({ name: 'description', type: 'text', title: 'Responsibilities' }),
    defineField({ name: 'link', type: 'url', title: 'Company Website Link (Optional)' }),
  ],
})