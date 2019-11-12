'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('past_year_exps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      facility_name: {
        type: Sequelize.STRING
      },
      facility_place: {
        type: Sequelize.STRING
      },
      degree: {
        type: Sequelize.BOOLEAN
      },
      mean: {
        type: Sequelize.DECIMAL
      },
      rating: {
        type: Sequelize.STRING
      },
      ranking: {
        type: Sequelize.STRING
      },
      candidature_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'candidatures',
          key: 'id',
        }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('past_year_exps');
  }
};