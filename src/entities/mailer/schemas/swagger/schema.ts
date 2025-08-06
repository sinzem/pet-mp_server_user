export const MessageToAdminRequest = {
    type: 'object',
    required: ['userName', 'email', 'text'],
    properties: {
        userName: { type: 'string', example: 'John' },
        email: { type: 'string', format: 'email', example: 'john@example.com' },
        text: { type: 'string', example: 'I have a problem' },
    },
};
  


