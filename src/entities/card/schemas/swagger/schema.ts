export const CreateCardRequest = {
    type: 'object',
    required: ['first_name', 'last_name', 'phone', 'email', 'password'],
    properties: {
        card_number: { type: 'number', example: '1234567890123456' },
        initials: { type: 'string', example: 'JOHN DOE' },
        card_cvc: { type: 'number', example: 567 },
        expiry: { type: 'string', example: '12/28' },
        system: { type: 'string', example: 'Visa' },
    },
};
  
export const CreateCardResponse = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        user_id: { type: 'string', format: 'uuid' },
        card_number: { type: 'number', example: '1234567890123456' },
        card_number_hidden: { type: 'string', example: '************3456' },
        card_balance: { type: 'number', example: 3895 },
        initials: { type: 'string', example: 'JOHN DOE' },
        card_cvc: { type: 'number', example: 567 },
        expiry: { type: 'string', example: '12/28' },
        system: { type: 'string', example: 'Visa' },
        created_at: { type: 'string', format: 'date-time', example: '2024-12-01T10:15:30.000Z' },
        updated_at: { type: 'string', format: 'date-time', example: '2024-12-01T10:15:30.000Z' }
    },
};

