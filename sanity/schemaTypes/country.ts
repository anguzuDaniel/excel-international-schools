export default {
  name: 'country',
  type: 'string',
  title: 'Country',
  options: {
    list: [
      { title: 'Uganda', value: 'uganda' },
      { title: 'South Sudan', value: 'south-sudan' },
    ],
    layout: 'radio' as const, 
  },
  validation: (Rule: any) => Rule.required(),
}