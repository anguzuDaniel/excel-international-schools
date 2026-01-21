export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Main Heading', type: 'string' },
        { name: 'subheading', title: 'Sub-heading', type: 'text' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
      ]
    },
    {
      name: 'story',
      title: 'Our Story',
      type: 'object',
      fields: [
        { name: 'title', title: 'Story Title', type: 'string' },
        { name: 'content', title: 'Story Content', type: 'array', of: [{ type: 'block' }] },
        { name: 'image', title: 'Story Image', type: 'image', options: { hotspot: true } },
      ]
    },
    {
      name: 'pillars',
      title: 'Core Pillars (The 3 Cs)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon (Emoji or Title)', type: 'string' },
            { name: 'title', title: 'Pillar Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { 
              name: 'colorTheme', 
              title: 'Color Theme', 
              type: 'string', 
              options: { list: ['blue', 'amber', 'emerald', 'rose'] } 
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.max(3).error('Commonly schools use exactly 3 pillars.')
    }
  ]
}