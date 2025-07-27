import pgPromise from 'pg-promise';

const pgp = pgPromise();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const db = pgp(`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`);

export default db;

