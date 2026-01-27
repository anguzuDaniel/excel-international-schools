export default {
  name: 'adminMessage',
  title: 'Admin Message',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    {
      name: 'country',
      type: 'string',
      title: 'Branch Country',
      options: {
        list: [
          { title: 'Uganda', value: 'uganda' },
          { title: 'South Sudan', value: 'south-sudan' },
        ],
        layout: 'radio' as const,
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'image', title: 'Image', type: 'image' },
  ],
}
