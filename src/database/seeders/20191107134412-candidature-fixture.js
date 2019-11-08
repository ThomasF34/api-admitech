'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Candidature', [{
      fname: 'Thomas',
      lname: 'Falcone',
      familySituation: 'Marié',
      birthdate: new Date(),
      email: 'monemail@email.com',
      phone: '0000000000',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fname: 'Lucas',
      lname: 'Gonçalves',
      familySituation: 'Marié',
      birthdate: new Date(),
      email: 'monemail2@email.com',
      phone: '0000000001',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Candidature', [{
      email: 'monemail@email.com',
    }]);
  }
};
