export default {
  name: 'application',
  title: 'Admissions Applications',
  type: 'document',
  fields: [
    { 
      name: 'submittedAt', 
      title: 'Application Time', 
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today'
      },
      readOnly: true // Prevents manual editing of the timestamp
    },
    { name: 'studentName', title: 'Student Name', type: 'string' },
    { name: 'branch', title: 'Campus Branch', type: 'string' },
    { name: 'dob', title: 'Date of Birth', type: 'date' },
    { name: 'gender', title: 'Gender', type: 'string' },
    { name: 'level', title: 'Level Applying For', type: 'string' },
    { name: 'parentName', title: 'Parent Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'address', title: 'Address', type: 'string' },
    { 
        name: 'status', 
        title: 'Application Status', 
        type: 'string', 
        initialValue: 'pending',
        options: { list: ['pending', 'reviewed', 'accepted', 'rejected'] } 
    },
  ],
  // This makes the timestamp visible in the Sanity Studio list view
  preview: {
    select: {
      title: 'studentName',
      subtitle: 'submittedAt',
    },
  },
};