export default {
  name: 'campuses',
  type: 'document',
  title: 'School Campuses',
  fields: [
    {
      name: 'locations',
      type: 'array',
      title: 'Campuses List',
      description: 'Add and manage the details for each school campus',
      of: [
        {
          type: 'object',
          name: 'location',
          fields: [
            { 
              name: 'campusName', 
              type: 'string', 
              title: 'Campus Name',
              description: 'e.g., Arua Hill Campus or South Sudan Campus' 
            },
            { 
              name: 'image', 
              type: 'image', 
              title: 'Campus Image',
              options: { hotspot: true } // Allows you to crop the image inside Sanity
            },
            { name: 'address', type: 'string', title: 'Physical Address' },
            { name: 'email', type: 'string', title: 'Contact Email' },
            { 
              name: 'phoneNumbers', 
              type: 'array', 
              title: 'Phone Numbers', 
              of: [{ type: 'string' }] 
            },
            { 
              name: 'mapUrl', 
              type: 'url', 
              title: 'Google Maps URL',
              description: 'Link to the location on Google Maps'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Brief Description',
              description: 'A short paragraph about this specific campus.'
            },
            {
              name: 'slug',
              type: 'slug',
              title: 'URL Slug',
              options: {
                source: 'campusName', // Automatically generates from the name
                maxLength: 96,
              },
              validation: (Rule: any) => Rule.required(),
            },
          ],
          // This part makes the Sanity Studio look organized
          preview: {
            select: {
              title: 'campusName',
              subtitle: 'address',
              media: 'image'
            }
          }
        },
      ],
    },
  ],
}