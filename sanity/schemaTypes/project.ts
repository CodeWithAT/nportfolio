import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'My Projects',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Project Title' }),
    defineField({ name: 'category', type: 'string', title: 'Category (e.g. Web Dev, SaaS)' }),
    defineField({ name: 'image', type: 'image', title: 'Thumbnail Image', options: { hotspot: true } }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ 
      name: 'tech', 
      title: 'Tech Stack', 
      type: 'array', 
      of: [{ type: 'string' }],
      description: 'Add technologies one by one (e.g., React, Next.js)'
    }),
    defineField({ name: 'link', type: 'url', title: 'Live Demo Link' }),
    defineField({ name: 'github', type: 'url', title: 'GitHub Repo Link' }),
    defineField({ name: 'date', type: 'string', title: 'Date (e.g. Oct 2025)' }),
  ],
})