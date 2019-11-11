'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // Refers to a user 
      queryInterface.addColumn('candidatures', 'user_id', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
      }),

      // Personnel
      queryInterface.addColumn('candidatures', 'first_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'last_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'nationnality', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'birth_date', {
        type: Sequelize.DATEONLY
      }),
      queryInterface.addColumn('candidatures', 'birth_place', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'family_status', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'address', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'postal_code', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'city', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'state', {
        type: Sequelize.STRING
      }),

      // Scolaire
      queryInterface.addColumn('candidatures', 'bac_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'bac_year', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('candidatures', 'bac_mention', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'bac_realname', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'last_facility_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'last_facility_address', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'last_facility_postal_code', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'last_facility_city', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'last_facility_state', {
        type: Sequelize.STRING
      }),

      // Langues
      queryInterface.addColumn('candidatures', 'native_lang_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'first_lang_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'second_lang_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'third_lang_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'first_lang_level', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'second_lang_level', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'third_lang_level', {
        type: Sequelize.STRING
      }),

      // Experiences
      queryInterface.addColumn('candidatures', 'internships', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('candidatures', 'travels', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('candidatures', 'it_knowledge', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('candidatures', 'sports_interests', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('candidatures', 'strengths', {
        type: Sequelize.TEXT
      }),

      // Autre candidatures
      queryInterface.addColumn('candidatures', 'other_apply', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('candidatures', 'other_apply_name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'other_apply_place', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'other_apply_apprentise', {
        type: Sequelize.BOOLEAN
      }),

      // Other
      queryInterface.addColumn('candidatures', 'candidate_comment', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('candidatures', 'admin_comment', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('candidatures', 'status', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'branch', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'certified', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('candidatures', 'certified_at', {
        type: Sequelize.DATE
      }),

      // Contrainte d'intégrité
      queryInterface.addConstraint('candidatures', ['family_status'], {
        type: 'check',
        where: {
          family_status: ['married', 'single', 'other']
        }
      }),
      queryInterface.addConstraint('candidatures', ['first_lang_level'], {
        type: 'check',
        where: {
          first_lang_level: ['great', 'medium', 'basic']
        }
      }),
      queryInterface.addConstraint('candidatures', ['second_lang_level'], {
        type: 'check',
        where: {
          second_lang_level: ['great', 'medium', 'basic']
        }
      }),
      queryInterface.addConstraint('candidatures', ['third_lang_level'], {
        type: 'check',
        where: {
          third_lang_level: ['great', 'medium', 'basic']
        }
      }),
      queryInterface.addConstraint('candidatures', ['branch'], {
        type: 'check',
        where: {
          branch: ['do', 'se']
        }
      }),
      /* MUST BE DISCUSSED BEFORE IMPLEMENTED (TODO)
      queryInterface.addConstraint('candidatures', ['status'], {
        type: 'check',
        where: {
          status: ['']
        }
      }),*/

      queryInterface.removeColumn('candidatures', 'fname'),
      queryInterface.removeColumn('candidatures', 'lname'),
      queryInterface.removeColumn('candidatures', 'familySituation'),
      queryInterface.removeColumn('candidatures', 'birthdate'),
      queryInterface.removeColumn('candidatures', 'email')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('candidatures', 'first_name'),
      queryInterface.removeColumn('candidatures', 'last_name'),
      queryInterface.removeColumn('candidatures', 'nationnality'),
      queryInterface.removeColumn('candidatures', 'birth_date'),
      queryInterface.removeColumn('candidatures', 'birth_place'),
      queryInterface.removeColumn('candidatures', 'family_status'),
      queryInterface.removeColumn('candidatures', 'address'),
      queryInterface.removeColumn('candidatures', 'postal_code'),
      queryInterface.removeColumn('candidatures', 'city'),
      queryInterface.removeColumn('candidatures', 'state'),
      queryInterface.removeColumn('candidatures', 'bac_name'),
      queryInterface.removeColumn('candidatures', 'bac_year'),
      queryInterface.removeColumn('candidatures', 'bac_mention'),
      queryInterface.removeColumn('candidatures', 'bac_realname'),
      queryInterface.removeColumn('candidatures', 'last_facility_name'),
      queryInterface.removeColumn('candidatures', 'last_facility_address'),
      queryInterface.removeColumn('candidatures', 'last_facility_postal_code'),
      queryInterface.removeColumn('candidatures', 'last_facility_city'),
      queryInterface.removeColumn('candidatures', 'last_facility_state'),
      queryInterface.removeColumn('candidatures', 'native_lang_name'),
      queryInterface.removeColumn('candidatures', 'first_lang_name'),
      queryInterface.removeColumn('candidatures', 'second_lang_name'),
      queryInterface.removeColumn('candidatures', 'third_lang_name'),
      queryInterface.removeColumn('candidatures', 'first_lang_level'),
      queryInterface.removeColumn('candidatures', 'second_lang_level'),
      queryInterface.removeColumn('candidatures', 'third_lang_level'),
      queryInterface.removeColumn('candidatures', 'internships'),
      queryInterface.removeColumn('candidatures', 'travels'),
      queryInterface.removeColumn('candidatures', 'it_knowledge'),
      queryInterface.removeColumn('candidatures', 'sports_interests'),
      queryInterface.removeColumn('candidatures', 'strengths'),
      queryInterface.removeColumn('candidatures', 'other_apply'),
      queryInterface.removeColumn('candidatures', 'other_apply_name'),
      queryInterface.removeColumn('candidatures', 'other_apply_place'),
      queryInterface.removeColumn('candidatures', 'other_apply_apprentise'),
      queryInterface.removeColumn('candidatures', 'candidate_comment'),
      queryInterface.removeColumn('candidatures', 'admin_comment'),
      queryInterface.removeColumn('candidatures', 'status'),
      queryInterface.removeColumn('candidatures', 'branch'),
      queryInterface.removeColumn('candidatures', 'certified'),
      queryInterface.removeColumn('candidatures', 'certified_at'),

      queryInterface.addColumn('candidatures', 'fname', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'lname', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'familySituation', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('candidatures', 'birthdate', {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('candidatures', 'email', {
        type: Sequelize.STRING
      })
    ]);
  }
};
