require('dotenv').config();

module.exports = {
    development: {
        username: String(process.env.DB_USER),
        password: String(process.env.DB_PASSWORD),
        database: String(process.env.DB_NAME),
        host: process.env.DB_HOST,
        dialect: "postgres"
    }
};