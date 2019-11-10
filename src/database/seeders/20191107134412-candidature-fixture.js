'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Candidature', [{
      first_name: 'Thomas',
      last_name: 'Falcone',
      nationnality: 'Français',
      birth_date: new Date(),
      birth_place: 'montpellier',
      family_status: 'single',
      address: 'somewhere',
      postal_code: '34000',
      city: 'montpellier',
      state: 'france',
      bac_name: 'un bac',
      bac_year: 2009,
      bac_mention: 'bien',
      bac_realname: 'un super bac',
      last_facility_name: 'un etablissement',
      last_facility_address: 'somewhere',
      last_facility_postal_code: '34000',
      last_facility_city: 'montpellier',
      last_facility_state: 'france',
      native_lang_name: 'français',
      first_lang_name: 'anglais',
      second_lang_name: 'italien',
      third_lang_name: null,
      first_lang_level: 'great',
      second_lang_level: 'great',
      third_lang_level: null,
      internships: 'Franchement j\'ai fait des stages trop bien',
      travels: 'j\'ai aussi voyagé',
      it_knowledge: 'bon là j\'ai plus d\'inspi par contre',
      sports_interests: 'du sport ? ',
      strengths: 'mhhhh....',
      other_apply: false,
      other_apply_name: null,
      other_apply_place: null,
      other_apply_apprentise: null,
      candidate_comment: 'je suis content ',
      admin_comment: 'eleve a rejeter',
      status: 'REFUSE',
      branch: 'do',
      certified: true,
      certified_at: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Candidature', [{
      first_name: 'Thomas',
    }]);
  }
};
