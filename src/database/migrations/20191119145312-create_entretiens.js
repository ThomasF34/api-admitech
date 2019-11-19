'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('entretiens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      begining_hour: {
        type: Sequelize.STRING
      },
      ending_hour: {
        type: Sequelize.STRING
      },
      formation: {
        type: Sequelize.STRING
      },
      candidature_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'candidatures',
          key: 'id',
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    return await queryInterface.addConstraint('entretiens', ['formation'], {
      type: 'check',
      where: {
        formation: ['se', 'do']
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('entretiens');
  }
};
