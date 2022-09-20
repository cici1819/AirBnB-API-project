'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
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
        startDate: new Date("2023-9-1"),
        endDate: new Date("2023-9-2")

      },

      {
        spotId: 2,
        userId: 1,
        startDate: new Date("2023-9-3"),
        endDate: new Date("2023-9-6")

      },

      {
        spotId: 3,
        userId: 2,
        startDate: new Date("2023-9-4"),
        endDate: new Date("2023-9-5")

      },
      {
        spotId: 4,
        userId: 5,
        startDate: new Date("2023-9-6"),
        endDate: new Date("2023-9-7")

      },
      {
        spotId: 5,
        userId: 4,
        startDate: new Date("2023-9-8"),
        endDate: new Date("2023-9-10")

      },

      {
        spotId: 6,
        userId: 5,
        startDate: new Date("2022-10-8"),
        endDate: new Date("2022-10-10")

      },


    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
