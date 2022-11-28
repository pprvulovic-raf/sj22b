'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

      await queryInterface.bulkInsert('Categories', [
        {
          id: 1,
          naziv: "Vezba"
        },{
          id: 2,
          naziv: "Domaci"
        },{
          id: 3,
          naziv: "Projekat"
        }
    ], {});

    await queryInterface.bulkInsert('Tasks', [
      {
        naziv: "SJ Vezba 4",
        opis: "Vezba 4, node js rest api",
        datum: "2022-11-20",
        categoryID: 1,
        zavrseno: true
      },{
        naziv: "SJ Vezba 5",
        opis: "Vezba 5, vanilla js i ajax frontent",
        datum: "2022-12-01",
        categoryID: 1,
        zavrseno: false
      },{
        naziv: "SJ projektni zadatak",
        opis: "Node.js rest api i vanilla js ajax frontend",
        datum: "2023-01-10",
        categoryID: 3,
        zavrseno: false
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Tasks', null, {});
     await queryInterface.bulkDelete('Categories', null, {});
  }
};
