// DATABASE_URL=postgres://username:password@host:port/db_name - обязательно в .env создаем строку для подключения к БД(подключится автоматически, других настроек не нужно)
// npx node-pg-migrate create create-table-name - создание файла миграции
// npm run migrate up - запуск миграции (в package.json нужно добавить скрипт "migrate": "node-pg-migrate")

const shorthands = undefined;

const up = (pgm) => {
    pgm.createTable('user_progress', {
        id: { type: 'bigserial', primaryKey: true },
        user_id: { type: 'bigserial', notNull: true, references: '"user_data"', onDelete: 'CASCADE', unique: true },
        balance: { type: 'integer', default: 0 },
        index: { type: 'integer', default: 0 },
        clicks: { type: 'integer', default: 0 },
        hold: { type: 'integer', default: 0 },
        profit: { type: 'integer', default: 0 },
        budget: { type: 'integer', default: 0 },
        notification: { type: 'integer', default: 0 },
        created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
        updated_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
    });
};


const down = (pgm) => {
    pgm.dropTable('user_progress');
};

module.exports.shorthands = shorthands;
module.exports.up = up;
module.exports.down = down;
