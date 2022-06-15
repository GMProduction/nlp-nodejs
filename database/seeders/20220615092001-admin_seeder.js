'use strict';
const hash = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let _password = await hash.hash('admin', 13);
    return queryInterface.bulkInsert('users', [{
      username: 'admin',
      password: _password,
      roles: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};