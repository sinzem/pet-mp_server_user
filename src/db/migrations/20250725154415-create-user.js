'use strict';

// npx sequelize-cli migration:generate --name create-user  -  для создания этого документа и обертки миграции
// npx sequelize-cli db:migrate  -  запуск миграции
// npx sequelize-cli db:migrate:undo  -  откат миграции

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserData', {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
      name: {type: Sequelize.STRING, allowNull: false},
      surname: {type: Sequelize.STRING, allowNull: false},
      phone: {type: Sequelize.STRING, allowNull: false},
      email: {type: Sequelize.STRING, unique: true, allowNull: false},
      password: {type: Sequelize.STRING, allowNull: false},
      activation: {type: Sequelize.STRING, defaultValue: null},
      refreshToken: {type: Sequelize.STRING, defaultValue: null},
      role: {type: Sequelize.STRING, defaultValue: "manager"},
      photo: {type: Sequelize.STRING},
      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")},
      updatedAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")}
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('UserData');
  }
};
