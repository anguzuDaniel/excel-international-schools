export default {
  name: 'stats',
  type: 'document',
  title: 'School Statistics',
  fields: [
    {
      name: 'statItems',
      type: 'array',
      title: 'Statistic Items',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label (e.g. Students)' },
            { name: 'value', type: 'string', title: 'Value (e.g. 1500+)' },
            { name: 'icon', type: 'string', title: 'Icon Emoji (e.g. 🎓)' },
          ],
        },
      ],
    },
  ],
}