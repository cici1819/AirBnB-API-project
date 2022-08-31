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
    await queryInterface.bulkInsert('ReviewImages', [{
      reviewId: 1,
      url: '../AirBnB-API-project/png/insides/behzad-ghaffarian-nhWgZNV85LQ-unsplash.jpg'
    },

      {
        reviewId: 2,
      url: '../AirBnB-API-project/png/insides/collov-home-design-4_jQL4JCS98-unsplash.jpg'
    },

      {
        reviewId: 3,
        url:'../AirBnB-API-project/png/insides/daniil-silantev-sN4u56baSB0-unsplash.jpg'

      },
      {
        reviewId: 4,
        url:'../AirBnB-API-project/png/insides/jorge-de-jorge-NvqYkDPE0Rw-unsplash.jpg'
      },
      {
        reviewId: 5,
        url:'../AirBnB-API-project/png/insides/neonbrand-Wp7t4cWN-68-unsplash.jpg'
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
     await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
