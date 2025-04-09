'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'provider');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'provider',
      {
        type: Sequelize.BOOLEAN,
        default: false,
        allowNull: false
      });
  }
};
