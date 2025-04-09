'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('customers', 'status',
      {
        type: Sequelize.ENUM('ACTIVE', 'ARCHIVED'),
        allowNull: false,
        defaultValue: 'ACTIVE',
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('customers', 'status');
  }
};
