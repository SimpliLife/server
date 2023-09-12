'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cities', {
      city: {
        type: Sequelize.STRING,
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      province: {
        type: Sequelize.STRING,
        references: {
          model: 'Provinces',
          key: 'province'
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cities');
  }
};