// DATABASE_URL=postgres://username:password@host:port/db_name - обязательно в .env создаем строку для подключения к БД(подключится автоматически, других настроек не нужно)
// npx node-pg-migrate create create-table-name - создание файла миграции
// npm run migrate up - запуск миграции (в package.json нужно добавить скрипт "migrate": "node-pg-migrate")

const shorthands = undefined;

const up = (pgm) => {
    pgm.createTable('user_data', {
        id: { type: 'bigserial', primaryKey: true },
        first_name: { type: 'varchar(50)', notNull: true },
        last_name: { type: 'varchar(50)', notNull: true },
        phone: { type: 'varchar(24)', notNull: true },
        email: { type: 'varchar(100)', notNull: true, unique: true },
        password: { type: 'varchar(100)', notNull: true },
        activation: { type: 'varchar(50)', default: null },
        refresh_token: { type: 'varchar(100)', default: null },
        role: { type: 'varchar(24)', default: 'manager' },
        photo: { type: 'varchar(100)', default: null },
        created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
        updated_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
    });
};


const down = (pgm) => {
    pgm.dropTable('user_data');
};

module.exports.shorthands = shorthands;
module.exports.up = up;
module.exports.down = down;


// /**
//  * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
//  */
// export const shorthands = undefined;

// /**
//  * @param pgm {import('node-pg-migrate').MigrationBuilder}
//  * @param run {() => void | undefined}
//  * @returns {Promise<void> | void}
//  */
// export const up = (pgm) => {
//     pgm.createTable('user_data', {
//         id: { type: 'bigserial', primaryKey: true },
//         first_name: { type: 'varchar(50)', notNull: true },
//         last_name: { type: 'varchar(50)', notNull: true },
//         phone: { type: 'varchar(24)', notNull: true },
//         email: { type: 'varchar(100)', notNull: true, unique: true },
//         password: { type: 'varchar(100)', notNull: true },
//         activation: { type: 'varchar(50)', default: null },
//         refresh_token: { type: 'varchar(100)', default: null },
//         role: { type: 'varchar(24)', default: 'manager' },
//         photo: { type: 'varchar(100)', default: null },
//         created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
//         updated_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
//     });
// };

// /**
//  * @param pgm {import('node-pg-migrate').MigrationBuilder}
//  * @param run {() => void | undefined}
//  * @returns {Promise<void> | void}
//  */
// export const down = (pgm) => {
//     pgm.dropTable('user_data');
// };


