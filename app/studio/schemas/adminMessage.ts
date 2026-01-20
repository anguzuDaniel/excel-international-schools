export default {
  name: 'adminMessage',
  title: 'Admin Message',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'image', title: 'Image', type: 'image' },
  ],
}
