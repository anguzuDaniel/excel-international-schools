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
              title: 'Main Hero Image',
              description: 'This is the large image at the top of the campus page.',
              options: { hotspot: true } 
            },
            {
              name: 'campusImages',
              type: 'array',
              title: 'Campus Gallery',
              description: 'Additional photos of the campus facilities and student life.',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption',
                      description: 'Briefly describe this photo.'
                    }
                  ]
                }
              ]
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
                source: (_doc: any, options: { parent: { campusName: string } }) => options.parent.campusName,
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            },
          ],
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