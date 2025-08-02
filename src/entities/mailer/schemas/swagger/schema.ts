export const MessageToAdminRequest = {
    type: 'object',
    required: ['user_name', 'email', 'text'],
    properties: {
        user_name: { type: 'string', example: 'John' },
        email: { type: 'string', format: 'email', example: 'john@example.com' },
        text: { type: 'string', example: 'I have a problem' },
    },
};
  


