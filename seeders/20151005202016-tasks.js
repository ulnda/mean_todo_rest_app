'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var tasks = [];

    for (var i = 0; i < 10; i++) {
      tasks.push({ title: "Task #" + i, description: "Task Description #" + i, createdAt: new Date(), updatedAt: new Date() });
    }

    return queryInterface.bulkInsert('Tasks', tasks, {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Tasks', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
