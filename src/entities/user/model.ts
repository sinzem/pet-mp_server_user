// export const createUserDataTableQuery = `
//     CREATE TABLE IF NOT EXISTS user_data (
//         id BIGSERIAL NOT NULL PRIMARY KEY,
//         first_name VARCHAR(50) NOT NULL,
//         last_name VARCHAR(50) NOT NULL,
//         phone VARCHAR(24) NOT NULL,
//         email VARCHAR(50) UNIQUE NOT NULL,
//         password VARCHAR(100) NOT NULL,
//         activation VARCHAR(100) DEFAULT NULL,
//         refresh_token VARCHAR(100) DEFAULT NULL,
//         role VARCHAR(24) DEFAULT 'manager',
//         photo VARCHAR(100) DEFAULT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
// `;

// export const createUserProgressTableQuery = `
//     CREATE TABLE IF NOT EXISTS user_progress (
//         id BIGSERIAL NOT NULL PRIMARY KEY,
//         user_id BIGSERIAL UNIQUE REFERENCES user_data(id) ON DELETE CASCADE, 
//         balance INTEGER DEFAULT 0,
//         index INTEGER DEFAULT 0,
//         clicks INTEGER DEFAULT 0,
//         hold INTEGER DEFAULT 0,
//         profit INTEGER DEFAULT 0,
//         budget INTEGER DEFAULT 0,
//         notification INTEGER DEFAULT 0,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
// `;



