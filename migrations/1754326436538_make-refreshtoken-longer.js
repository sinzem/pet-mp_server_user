// DATABASE_URL=postgres://username:password@host:port/db_name - обязательно в .env создаем строку для подключения к БД(подключится автоматически, других настроек не нужно)
// npx node-pg-migrate create create-table-name - создание файла миграции
// npm run migrate up - запуск миграции (в package.json нужно добавить скрипт "migrate": "node-pg-migrate")


const shorthands = undefined;

const up = (pgm) => {
    pgm.alterColumn('user_data', 'refresh_token', {
        type: 'varchar(500)',
    });
};

const down = (pgm) => {
    pgm.alterColumn('user_data', 'refresh_token', {
        type: 'varchar(100)',
    });
};

module.exports.shorthands = shorthands;
module.exports.up = up;
module.exports.down = down;