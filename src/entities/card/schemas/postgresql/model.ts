// create tables when starting the server if we do not use migrations

export const createCardDataTableQuery = `
    CREATE TABLE IF NOT EXISTS card_data (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        user_id BIGSERIAL REFERENCES user_data(id) ON DELETE CASCADE,
        card_number VARCHAR(50) NOT NULL,
        card_number_hidden VARCHAR(50) DEFAULT NULL,
        card_balance INTEGER DEFAULT 0,
        initials VARCHAR(100) NOT NULL,
        card_cvc INTEGER NOT NULL,
        expiry VARCHAR(24) NOT NULL,
        system VARCHAR(24) DEFAULT 'Visa',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

