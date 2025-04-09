// Essa migration cria a tabela de clientes, com os campos id, name, email, createdAt e updatedAt.

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customers', { 
      // id: identificador único do cliente
      // name: nome do cliente
      // email: email do cliente
      // createdAt: data de criação do registro
      // updatedAt: data da última atualização do registro
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};