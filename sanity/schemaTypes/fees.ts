export default {
  name: 'fees',
  title: 'Fees Structure',
  type: 'document',
  fields: [
    {
      name: 'campus',
      title: 'Campus Branch',
      type: 'string',
      options: {
        list: [
          { title: 'Arua Campus', value: 'Arua Campus' },
          { title: 'South Sudan Campus', value: 'South Sudan Campus' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gradeLevel',
      title: 'Grade/Level',
      type: 'string',
      description: 'e.g. Primary, Secondary, or Grade 1-7',
    },
    {
      name: 'pricing',
      title: 'Pricing Details',
      type: 'object',
      fields: [
        { 
          name: 'currency', 
          title: 'Currency', 
          type: 'string',
          initialValue: 'UGX',
          options: {
            list: [
              { title: 'UGX', value: 'UGX' },
              { title: 'USD', value: 'USD' },
              { title: 'SSP', value: 'SSP' },
            ]
          }
        },
        { name: 'termly', title: 'Termly Amount', type: 'string' },
      ]
    },
    {
      name: 'pdfDownload',
      title: 'Official Fee Circular (PDF)',
      type: 'file',
      description: 'Upload the official scanned PDF for parents to download.',
      options: {
        accept: '.pdf',
      },
    },
  ],
};