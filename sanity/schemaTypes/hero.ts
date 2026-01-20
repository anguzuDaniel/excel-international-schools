export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    { name: 'text', title: 'Text', type: 'text' },
    { 
      name: 'images', 
      title: 'Images', 
      type: 'array', 
      of: [{ type: 'image' }] 
    },
  ],
}
