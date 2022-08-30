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
     *
    */
    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        review: "Great!! Amazing !",
        stars:5
      },
      {
        userId: 2,
        spotId: 1,
        review: "Good ",
        stars:4
      },
      {
        userId: 5,
        spotId: 2,
        review: "Would rent again no problems at all",
        stars:5
      },
      {
        userId: 4,
        spotId: 3,
        review: "Awesome guy awesome house",
        starts:5
      },
      {
        userId: 5,
        spotId: 5,
        review: "Great home!! Amazing views!",
        stars:5
      },
      {
        userId: 3,
        boatId: 4,
        review: "Would rent again no problems at all.",
        stars:5
      }
    ],
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Reviews',null, {

    });
  }
};
