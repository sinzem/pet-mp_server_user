// DATABASE_URL=postgres://username:password@host:port/db_name - обязательно в .env создаем строку для подключения к БД(подключится автоматически, других настроек не нужно)
// npx node-pg-migrate create create-table-name - создание файла миграции
// npm run migrate up - запуск миграции (в package.json нужно добавить скрипт "migrate": "node-pg-migrate")

// Changing the id type in the user_pregress table from bigserial to uuid
const shorthands = undefined;

const up = (pgm) => {
    pgm.createExtension('uuid-ossp', { ifNotExists: true });

    pgm.addColumn('user_progress', {
        new_id: { type: 'uuid', default: pgm.func('uuid_generate_v4()') },
    });

    pgm.sql(`UPDATE user_progress SET new_id = uuid_generate_v4();`);

    pgm.dropConstraint('user_progress', 'user_progress_pkey');
    pgm.dropColumn('user_progress', 'id');

    pgm.renameColumn('user_progress', 'new_id', 'id');
    pgm.addConstraint('user_progress', 'user_progress_pkey', { primaryKey: ['id']} );
};


const down = (pgm) => {
    pgm.addColumn('user_progress', {old_id: {type: 'bigserial'}});

    pgm.sql(`UPDATE user_progress SET old_id = nextval('user_progress_old_id_seq')`);
    pgm.dropConstraint('user_progress', 'user_progress_pkey');
    pgm.dropColumn('user_progress', 'id');
    pgm.renameColumn('user_progress', 'old_id', 'id');
    pgm.addConstraint('user_progress', 'user_progress_pkey', {primaryKey: ['id']});
};

module.exports.shorthands = shorthands;
module.exports.up = up;
module.exports.down = down;