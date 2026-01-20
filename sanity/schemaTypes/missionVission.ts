import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'missionVision',
  title: 'Mission & Vision',
  type: 'document',
  fields: [
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
  ],
})
