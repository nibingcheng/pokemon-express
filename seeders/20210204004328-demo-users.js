"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name:'Tony Stark',
          username: 'ironman',
          password: 'prettyawesome',
          teamId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Clark Kent',
          username: 'superman',
          password: `canfly`,
          teamId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:'Bruce Wayne',
          username: 'batman',
          password: 'hasgadgets',
          teamId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
