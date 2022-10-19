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
     *
    */
    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 2,
        spotId: 1,
        review: "Great!! Amazing !",
        stars: 5
      },
      {
        userId: 1,
        spotId: 2,
        review: "Good ",
        stars: 4
      },
      {
        userId: 2,
        spotId: 3,
        review: "Would rent again no problems at all",
        stars: 5
      },
      {
        userId: 5,
        spotId: 4,
        review: "Awesome guy awesome house",
        stars: 5
      },
      {
        userId: 4,
        spotId: 5,
        review: "Great home!! Amazing views!",
        stars: 5
      },
      {
        userId: 4,
        spotId: 6,
        review: "Great views!",
        stars: 5
      },
      {
        userId: 4,
        spotId: 7,
        review: "A wonderful stay!",
        stars: 5
      },
      {
        userId: 5,
        spotId: 8,
        review: "Second time here with a group, had a great stay, hope to be back!",
        stars: 5
      },
      {
        userId: 3,
        spotId: 9,
        review: "Amazing place ! Definitely one of a kind",
        stars: 5
      },
      {
        userId: 1,
        spotId: 10,
        review: "Some people come to take pictures. Others come to get a good look at themselves",
        stars: 5

      },
      {
        userId: 1,
        spotId: 11,
        review: "Great location and great charm, great communication. A must-visit if you're planning to stay in the bend area.",
        stars: 5
      },

      {
        userId: 3,
        spotId: 12,
        review: "This place was amazing! Very true to the listing photos and description. Clean, cozy, and definitely a place I'd go back to.",
        stars: 4
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

    await queryInterface.bulkDelete('Reviews', null, {

    });
  }
};
