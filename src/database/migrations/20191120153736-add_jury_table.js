'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jury', {

      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      entretien_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'entretiens',
          key: 'id',
        }
      },
      note: {
        type: DataTypes.DECIMAL
      },
      comment: {
        type: DataTypes.STRING
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('jury');
  }
};
