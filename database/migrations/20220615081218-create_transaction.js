'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          foreignKey: 'id'
        }
      },
      no_transaksi: {
        type: Sequelize.STRING,
      },
      sub_total: {
        type: Sequelize.INTEGER,
      },
      discount: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("transactions");
  }
};