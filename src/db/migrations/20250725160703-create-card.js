'use strict';

// npx sequelize-cli migration:generate --name create-user_progress  -  для создания этого документа и обертки миграции
// npx sequelize-cli db:migrate  -  запуск миграции
// npx sequelize-cli db:migrate:undo  -  откат миграции

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('CardData', {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
      cardNumber: {type: Sequelize.STRING, allowNull: false},
      cardNumberHidden: {type: Sequelize.STRING},
      cardBalance: {type: Sequelize.INTEGER, defaultValue: 0},
      initials: {type: Sequelize.STRING, allowNull: false},
      cardCvc: {type: Sequelize.INTEGER, allowNull: false},
      expiry: {type: Sequelize.STRING, allowNull: false},
      system: {type: Sequelize.STRING, defaultValue: "Visa"},
      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")},
      updatedAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")}
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('CardData');
  }
};