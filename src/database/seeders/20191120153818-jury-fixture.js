'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      "SELECT id from users where role='administration';"
    );

    const entretiens = await queryInterface.sequelize.query(
      'SELECT id from entretiens;'
    );
    const userRow = users[0];
    const entretienRow = entretiens[0];

    await queryInterface.bulkInsert('jury', [
      {
        user_id: userRow[0].id,
        entretien_id: entretienRow[0].id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('jury', [{
      entretien_id: 1
    }])
  }
};
