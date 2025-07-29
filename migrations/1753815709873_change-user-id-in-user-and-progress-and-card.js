// DATABASE_URL=postgres://username:password@host:port/db_name - обязательно в .env создаем строку для подключения к БД(подключится автоматически, других настроек не нужно)
// npx node-pg-migrate create create-table-name - создание файла миграции
// npm run migrate up - запуск миграции (в package.json нужно добавить скрипт "migrate": "node-pg-migrate")

const shorthands = undefined;

const up = (pgm) => {
    // connection uuid
    pgm.createExtension('uuid-ossp', { ifNotExists: true });

    // add new_id to user_data
    pgm.addColumn('user_data', {new_id: {type: 'uuid', default: pgm.func('uuid_generate_v4()')}});
    // update new_id
    pgm.sql(`UPDATE user_data SET new_id = uuid_generate_v4();`);
  
    // updating related tables
    pgm.addColumn('user_progress', { new_user_id: { type: 'uuid' } });
    pgm.sql(`
        UPDATE user_progress
        SET new_user_id = user_data.new_id
        FROM user_data
        WHERE user_data.id = user_progress.user_id
    `);
  
    pgm.addColumn('card_data', { new_user_id: { type: 'uuid' } });
    pgm.sql(`
        UPDATE card_data
        SET new_user_id = user_data.new_id
        FROM user_data
        WHERE user_data.id = card_data.user_id
    `);

    // delete foreign keys
    pgm.dropConstraint('user_progress', 'user_progress_user_id_fkey');
    pgm.dropConstraint('card_data', 'card_data_user_id_fkey');
  
    // delete old id
    pgm.dropColumn('user_data', 'id');
    pgm.renameColumn('user_data', 'new_id', 'id');
  
    pgm.dropColumn('user_progress', 'user_id');
    pgm.renameColumn('user_progress', 'new_user_id', 'user_id');
  
    pgm.dropColumn('card_data', 'user_id');
    pgm.renameColumn('card_data', 'new_user_id', 'user_id');
  
    // update primary and foreign keys
    pgm.addConstraint('user_data', 'user_data_pkey', { primaryKey: ['id'] });
  
    pgm.addConstraint('user_progress', 'user_progress_user_id_fkey', {
        foreignKeys: {
            columns: 'user_id',
            references: 'user_data(id)',
            onDelete: 'CASCADE',
        },
    });
  
    pgm.addConstraint('card_data', 'card_data_user_id_fkey', {
        foreignKeys: {
            columns: 'user_id',
            references: 'user_data(id)',
            onDelete: 'CASCADE',
        },
    });
  
    // set default for user_data.id
    pgm.alterColumn('user_data', 'id', {
        default: pgm.func('uuid_generate_v4()'),
    });
};

// it's better to do such a fuck-up unilaterally
const down = (pgm) => {
    throw new Error("Rollback not implemented - potentially dangerous operation");
};

module.exports.shorthands = shorthands;
module.exports.up = up;
module.exports.down = down;