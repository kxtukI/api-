'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('contacts', 'status',
      {
        type: Sequelize.ENUM('ACTIVE', 'ARCHIVED'),
        allowNull: false,
        defaultValue: 'ACTIVE',
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('contacts', 'status');
  }
};
