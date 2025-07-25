'use strict';

// npx sequelize-cli migration:generate --name create-user_progress  -  для создания этого документа и обертки миграции
// npx sequelize-cli db:migrate  -  запуск миграции
// npx sequelize-cli db:migrate:undo  -  откат миграции

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserProgress', {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
      balance: {type: Sequelize.INTEGER, defaultValue: 0},
      index: {type: Sequelize.INTEGER, defaultValue: 0},
      clicks: {type: Sequelize.INTEGER, defaultValue: 0},
      hold: {type: Sequelize.INTEGER, defaultValue: 0},
      profit: {type: Sequelize.INTEGER, defaultValue: 0},
      budget: {type: Sequelize.INTEGER, defaultValue: 0},
      notification: {type: Sequelize.INTEGER, defaultValue: 0},
      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")},
      updatedAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")}
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('UserProgress');
  }
};
