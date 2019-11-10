'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // Personnel
      queryInterface.addColumn('Candidature', 'first_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'last_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'nationnality', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'birth_date', {
        type: Sequelize.DATEONLY
      }),
      queryInterface.addColumn('Candidature', 'birth_place', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'family_status', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'address', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'postal_code', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'city', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'state', {
        type: Sequelize.STRING
      }),

      // Scolaire
      queryInterface.addColumn('Candidature', 'bac_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'bac_year', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Candidature', 'bac_mention', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'bac_realname', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'last_facility_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'last_facility_address', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'last_facility_postal_code', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'last_facility_city', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'last_facility_state', {
        type: Sequelize.STRING
      }),

      // Langues
      queryInterface.addColumn('Candidature', 'native_lang_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'first_lang_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'second_lang_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'third_lang_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'first_lang_level', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'second_lang_level', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'third_lang_level', {
        type: Sequelize.STRING
      }),

      // Experiences
      queryInterface.addColumn('Candidature', 'internships', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('Candidature', 'travels', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('Candidature', 'it_knowledge', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('Candidature', 'sports_interests', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('Candidature', 'strengths', {
        type: Sequelize.TEXT
      }),

      // Autre candidature
      queryInterface.addColumn('Candidature', 'other_apply', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Candidature', 'other_apply_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'other_apply_place', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'other_apply_apprentise', {
        type: Sequelize.BOOLEAN
      }),

      // Other
      queryInterface.addColumn('Candidature', 'candidate_comment', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('Candidature', 'admin_comment', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('Candidature', 'status', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'branch', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'certified', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Candidature', 'certified_at', {
        type: Sequelize.DATE
      }),

      // Contrainte d'intégrité
      queryInterface.addConstraint('Candidature', ['family_status'], {
        type: 'check',
        where: {
          family_status: ['married', 'single', 'other']
        }
      }),
      queryInterface.addConstraint('Candidature', ['first_lang_level'], {
        type: 'check',
        where: {
          first_lang_level: ['great', 'medium', 'basic']
        }
      }),
      queryInterface.addConstraint('Candidature', ['second_lang_level'], {
        type: 'check',
        where: {
          second_lang_level: ['great', 'medium', 'basic']
        }
      }),
      queryInterface.addConstraint('Candidature', ['third_lang_level'], {
        type: 'check',
        where: {
          third_lang_level: ['great', 'medium', 'basic']
        }
      }),
      queryInterface.addConstraint('Candidature', ['branch'], {
        type: 'check',
        where: {
          branch: ['do', 'se']
        }
      }),
      /* MUST BE DISCUSSED BEFORE IMPLEMENTED (TODO)
      queryInterface.addConstraint('Candidature', ['status'], {
        type: 'check',
        where: {
          status: ['']
        }
      }),*/

      queryInterface.removeColumn('Candidature', 'fname'),
      queryInterface.removeColumn('Candidature', 'lname'),
      queryInterface.removeColumn('Candidature', 'familySituation'),
      queryInterface.removeColumn('Candidature', 'birthdate'),
      queryInterface.removeColumn('Candidature', 'email')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Candidature', 'first_name'),
      queryInterface.removeColumn('Candidature', 'last_name'),
      queryInterface.removeColumn('Candidature', 'nationnality'),
      queryInterface.removeColumn('Candidature', 'birth_date'),
      queryInterface.removeColumn('Candidature', 'birth_place'),
      queryInterface.removeColumn('Candidature', 'family_status'),
      queryInterface.removeColumn('Candidature', 'address'),
      queryInterface.removeColumn('Candidature', 'postal_code'),
      queryInterface.removeColumn('Candidature', 'city'),
      queryInterface.removeColumn('Candidature', 'state'),
      queryInterface.removeColumn('Candidature', 'bac_name'),
      queryInterface.removeColumn('Candidature', 'bac_year'),
      queryInterface.removeColumn('Candidature', 'bac_mention'),
      queryInterface.removeColumn('Candidature', 'bac_realname'),
      queryInterface.removeColumn('Candidature', 'last_facility_name'),
      queryInterface.removeColumn('Candidature', 'last_facility_address'),
      queryInterface.removeColumn('Candidature', 'last_facility_postal_code'),
      queryInterface.removeColumn('Candidature', 'last_facility_city'),
      queryInterface.removeColumn('Candidature', 'last_facility_state'),
      queryInterface.removeColumn('Candidature', 'native_lang_name'),
      queryInterface.removeColumn('Candidature', 'first_lang_name'),
      queryInterface.removeColumn('Candidature', 'second_lang_name'),
      queryInterface.removeColumn('Candidature', 'third_lang_name'),
      queryInterface.removeColumn('Candidature', 'first_lang_level'),
      queryInterface.removeColumn('Candidature', 'second_lang_level'),
      queryInterface.removeColumn('Candidature', 'third_lang_level'),
      queryInterface.removeColumn('Candidature', 'internships'),
      queryInterface.removeColumn('Candidature', 'travels'),
      queryInterface.removeColumn('Candidature', 'it_knowledge'),
      queryInterface.removeColumn('Candidature', 'sports_interests'),
      queryInterface.removeColumn('Candidature', 'strengths'),
      queryInterface.removeColumn('Candidature', 'other_apply'),
      queryInterface.removeColumn('Candidature', 'other_apply_name'),
      queryInterface.removeColumn('Candidature', 'other_apply_place'),
      queryInterface.removeColumn('Candidature', 'other_apply_apprentise'),
      queryInterface.removeColumn('Candidature', 'candidate_comment'),
      queryInterface.removeColumn('Candidature', 'admin_comment'),
      queryInterface.removeColumn('Candidature', 'status'),
      queryInterface.removeColumn('Candidature', 'branch'),
      queryInterface.removeColumn('Candidature', 'certified'),
      queryInterface.removeColumn('Candidature', 'certified_at'),

      queryInterface.addColumn('Candidature', 'fname', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'lname', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'familySituation', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Candidature', 'birthdate', {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('Candidature', 'email', {
        type: Sequelize.STRING
      })
    ]);
  }
};
