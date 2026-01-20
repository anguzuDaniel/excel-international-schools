// sanity/schemaTypes/curriculum.ts
export default {
  name: 'curriculum',
  type: 'document',
  title: 'Curriculum',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title',
      initialValue: 'Our Curriculum',
    },
    {
      name: 'description',
      type: 'text',
      title: 'General Description',
      description: 'A brief overview of the academic programs offered.',
    },
    {
      name: 'levels',
      type: 'array',
      title: 'Education Levels',
      description: 'Add levels like O-Level, A-Level, etc.',
      of: [
        {
          type: 'object',
          name: 'level',
          fields: [
            { name: 'title', type: 'string', title: 'Level Name (e.g., O-Level)' },
            { name: 'details', type: 'text', title: 'Details/Subjects' },
            { name: 'image', type: 'image', title: 'Icon or Image', options: { hotspot: true } },
          ],
        },
      ],
    },
  ],
}