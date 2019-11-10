'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attach_type: {
        type: Sequelize.STRING
      },
      url: {
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
    return await queryInterface.addConstraint('attachments', ['attach_type'], {
      type: 'check',
      where: {
        attach_type: ['cover_letter', 'cv', 'bac_marks', 'year_marks', 'degree', 'current_year_marks', 'notice_further_study']
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('attachments');
  }
};