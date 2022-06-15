'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('carts', 'transaction_id', {
      type: Sequelize.INTEGER,
      after: 'user_id',
      allowNull: true,
      references: {
        model: 'transactions',
        foreignKey: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("carts", 'carts_transaction_id_foreign_idx');
    await queryInterface.removeColumn('carts', 'transaction_id');
  }
};