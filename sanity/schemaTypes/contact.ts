export default {
  name: 'contact',
  type: 'document',
  title: 'School Locations',
  fields: [
    {
      name: 'locations',
      type: 'array',
      title: 'School Campuses',
      description: 'Add details for each school campus/location',
      of: [
        {
          type: 'object',
          name: 'location',
          fields: [
            { name: 'campusName', type: 'string', title: 'Campus Name (e.g. Main Campus)' },
            { name: 'address', type: 'string', title: 'Physical Address' },
            { name: 'email', type: 'string', title: 'Contact Email' },
            { 
              name: 'phoneNumbers', 
              type: 'array', 
              title: 'Phone Numbers', 
              of: [{ type: 'string' }] 
            },
            { name: 'mapUrl', type: 'url', title: 'Google Maps Embed URL' },
          ],
        },
      ],
    },
  ],
}