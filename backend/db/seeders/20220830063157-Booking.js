'use strict';

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
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: "2022-9-1",
        endDate:"2022-9-2"

      },

      {
        spotId: 2,
        userId: 1,
        startDate: "2022-9-3",
        endDate:"2022-9-6"

      },

      {
        spotId: 3,
        userId: 2,
        startDate: "2022-9-4",
        endDate:"2022-9-5"

      },
      {
        spotId: 4,
        userId: 5,
        startDate: "2022-9-6",
        endDate:"2022-9-7"

      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2022-9-8",
        endDate:"2022-9-10"

      },




     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('', null, {});
  }
};
