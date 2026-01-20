export default {
  name: 'about',
  type: 'document',
  title: 'About',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title',
    },
    {
      name: 'content',
      type: 'text',
      title: 'Content',
      description: 'The main text for the about section',
    },
    {
      name: 'image',
      type: 'image',
      title: 'About Image',
      options: { hotspot: true },
    }
  ],
}