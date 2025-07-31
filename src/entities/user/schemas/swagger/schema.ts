export const CreateUserRequest = {
    type: 'object',
    required: ['first_name', 'last_name', 'phone', 'email', 'password'],
    properties: {
        first_name: { type: 'string', example: 'John' },
        last_name: { type: 'string', example: 'Doe' },
        phone: { type: 'string', example: '+380912345678' },
        email: { type: 'string', format: 'email', example: 'john@example.com' },
        password: { type: 'string', example: 'securePassword123' },
    },
};
  
export const CreateUserResponse = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        first_name: { type: 'string', example: 'John' },
        last_name: { type: 'string', example: 'Doe' },
        phone: { type: 'string', example: '+380912345678' },
        email: { type: 'string', example: 'john@example.com' },
        activation: { type: 'string', nullable: true, example: "active" },
        refresh_token: { type: 'string', nullable: true, example: 'eyJhbGciOiJIUzI1.eyJzdWIiOiIxMjM0NTY3O.SflKxwRJSMeKKF2' },
        role: { type: 'string', example: 'manager' },
        photo: { type: 'string', nullable: true, example: '3fa85f64-5717-4562-b3fc-2c963f66afa6.jpg' },
        created_at: { type: 'string', format: 'date-time', example: '2024-12-01T10:15:30.000Z' },
        updated_at: { type: 'string', format: 'date-time', example: '2024-12-01T10:15:30.000Z' }
    },
};

