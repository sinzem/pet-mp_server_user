// DATABASE_URL=postgres://username:password@host:port/db_name - обязательно в .env создаем строку для подключения к БД(подключится автоматически, других настроек не нужно)
// npx node-pg-migrate create create-table-name - создание файла миграции
// npm run migrate up - запуск миграции (в package.json нужно добавить скрипт "migrate": "node-pg-migrate")

const shorthands = undefined;

const up = (pgm) => {
    pgm.createTable('card_data', {
        id: { type: 'bigserial', primaryKey: true },
        user_id: { type: 'bigserial', notNull: true, references: '"user_data"', onDelete: 'CASCADE' },
        card_number: { type: 'varchar(50)', notNull: true },
        card_number_hidden: { type: 'varchar(50)', default: null },
        card_balance: { type: 'integer', default: 0 },
        initials: { type: 'varchar(100)', notNull: true},
        card_cvc: { type: 'integer', notNull: true },
        expiry: { type: 'varchar(24)', notNull: true },
        system: { type: 'varchar(24)', default: 'visa' },
        created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
        updated_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
    });
};


const down = (pgm) => {
    pgm.dropTable('card_data');
};

module.exports.shorthands = shorthands;
module.exports.up = up;
module.exports.down = down;