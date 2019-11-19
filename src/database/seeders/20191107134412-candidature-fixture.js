'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'Alice',
      last_name: 'Dupond',
      email: 'email@eleve.fr',
      password: bcrypt.hashSync('abcd', 10),
      role: 'eleve',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      first_name: 'Albert',
      last_name: 'Dupond',
      email: 'email@eleve2.fr',
      password: bcrypt.hashSync('abcd', 10),
      role: 'eleve',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      first_name: 'Bob',
      last_name: 'Dupond',
      email: 'email@administration.fr',
      password: bcrypt.hashSync('abcd', 10),
      role: 'administration',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      first_name: 'Elisa',
      last_name: 'Dupond',
      email: 'email@entreprise.fr',
      password: bcrypt.hashSync('abcd', 10),
      role: 'entreprise',
      created_at: new Date(),
      updated_at: new Date()
    },
    ]);

    await queryInterface.bulkInsert('candidatures', [{
      user_id: 1,
      draft: false,
      first_name: 'Alice',
      last_name: 'Dupond',
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
      status: 2,
      branch: 'do',
      certified: true,
      certified_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: 2,
      draft: false,
      first_name: 'Albert',
      last_name: 'Dupond',
      nationnality: 'Français',
      birth_date: new Date(),
      birth_place: 'montpellier',
      family_status: 'married',
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
      second_lang_name: 'espagnol',
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
      status: 7,
      branch: 'do',
      certified: true,
      certified_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    ], {});

    const candidatures = await queryInterface.sequelize.query(
      'SELECT id from candidatures;'
    );

    const candidatureRow = candidatures[0];

    await queryInterface.bulkInsert('past_year_exps', [
      {
        year: '2019',
        name: 'une formation',
        facility_name: 'une ecole',
        facility_place: 'a montpellier',
        degree: false,
        mean: 10,
        rating: '4',
        ranking: '4/200',
        candidature_id: candidatureRow[0].id,
      }
    ], {});

    await queryInterface.bulkInsert('attachments', [
      {
        attach_type: 'cover_letter',
        key: '1234.pdf',
        candidature_id: candidatureRow[0].id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    Promise.all([
      queryInterface.bulkDelete('candidatures', [{
        first_name: 'Alice',
      }, {
        first_name: 'Albert',
      }]),
      queryInterface.bulkDelete('past_year_exps', null),
      queryInterface.bulkDelete('attachments', null),
      queryInterface.bulkDelete('users', [{ first_name: 'Alice' }, { first_name: 'Albert' }, { first_name: 'Bob' }, { first_name: 'Elisa' }]),
    ]);
  }
};
