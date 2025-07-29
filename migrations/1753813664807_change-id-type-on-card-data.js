// DATABASE_URL=postgres://username:password@host:port/db_name - обязательно в .env создаем строку для подключения к БД(подключится автоматически, других настроек не нужно)
// npx node-pg-migrate create create-table-name - создание файла миграции
// npm run migrate up - запуск миграции (в package.json нужно добавить скрипт "migrate": "node-pg-migrate")

const shorthands = undefined;

const up = (pgm) => {
    pgm.createExtension('uuid-ossp', { ifNotExists: true });

    pgm.addColumn('card_data', {
        new_id: { type: 'uuid', default: pgm.func('uuid_generate_v4()') },
    });

    pgm.sql(`UPDATE card_data SET new_id = uuid_generate_v4();`);

    pgm.dropConstraint('card_data', 'card_data_pkey');
    pgm.dropColumn('card_data', 'id');

    pgm.renameColumn('card_data', 'new_id', 'id');
    pgm.addConstraint('card_data', 'card_data_pkey', { primaryKey: ['id']} );
};


const down = (pgm) => {
    pgm.addColumn('card_data', {old_id: {type: 'bigserial'}});

    pgm.sql(`UPDATE card_data SET old_id = nextval('card_data_old_id_seq')`);
    pgm.dropConstraint('card_data', 'card_data_pkey');
    pgm.dropColumn('card_data', 'id');
    pgm.renameColumn('card_data', 'old_id', 'id');
    pgm.addConstraint('card_data', 'card_data_pkey', {primaryKey: ['id']});
};

module.exports.shorthands = shorthands;
module.exports.up = up;
module.exports.down = down;