export default {
  name: 'hero',
  title: 'Hero & Branding',
  type: 'document',
  fields: [
    { 
      name: 'logo', 
      title: 'School Logo', 
      type: 'image',
      description: 'Upload the school crest/logo (transparent PNG recommended).',
      options: { hotspot: true } 
    },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    { name: 'text', title: 'Text', type: 'text' },
    { 
      name: 'images', 
      title: 'Hero Carousel Images', 
      type: 'array', 
      of: [{ type: 'image', options: { hotspot: true } }] 
    },
  ],
}