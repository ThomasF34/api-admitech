
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const candidatures = await queryInterface.sequelize.query(
      'SELECT id from candidatures;'
    );

    const candidatureRow = candidatures[0];

    await queryInterface.bulkInsert('entretiens', [{
      id: 1,
      date: new Date(),
      begining_hour: '13h',
      ending_hour: '14h30',
      formation: 'se',
      candidature_id: candidatureRow[0].id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      date: new Date(),
      begining_hour: '13h',
      ending_hour: '14h30',
      formation: 'do',
      candidature_id: 0,
      created_at: new Date(),
      updated_at: new Date()
    }
    ,
    {
      id: 3,
      date: new Date(),
      begining_hour: '14h45',
      ending_hour: '15h30',
      formation: 'do',
      candidature_id: 0,
      created_at: new Date(),
      updated_at: new Date()
    }
    ]);
  },


  down: (queryInterface, Sequelize) => {
    Promise.all([
      queryInterface.bulkDelete('entretiens', [{
        id: 1,
        id: 2,
        id: 3
      }]),
    ]);
  }
};
