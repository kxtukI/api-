module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'file_id',
      {
        type: Sequelize.INTEGER,
        references: { model: "files", key: "id" },
        onUpdate: "CASCADE", 
        onDelete: "SET NULL"
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'file_id');
  }
};
