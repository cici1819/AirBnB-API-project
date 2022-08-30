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
    await queryInterface.bulkInsert('SpotImages', [{
      spotId: 1,
      url: "../AirBnB-API-project/png/extriors/ann-wallace-biepNX5n7r4-unsplash.jpg",
      preview: true

    },
    {
      spotId: 2,
      url: "../AirBnB-API-project/png/extriors/bailey-anselme-Bkp3gLygyeA-unsplash.jpg",
      preview: true
    },
    {
      spotId: 3,
      url: "../AirBnB-API-project/png/extriors/r-architecture-2gDwlIim3Uw-unsplash.jpg",
      preview: true

    },
    {
      spotId: 4,
      url: "../AirBnB-API-project/png/extriors/ricardo-gomez-angel-YwVBpx4Wbag-unsplash.jpg",
      preview: true
    },
    {
      spotId: 5,
      url: "../AirBnB-API-project/png/extriors/stephan-bechert-yFV39g6AZ5o-unsplash.jpg",
      preview: true
    }






    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
