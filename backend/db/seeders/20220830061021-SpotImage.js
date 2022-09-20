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
      url: " https://a0.muscache.com/im/pictures/prohost-api/Hosting-32568567/original/704e23ed-680f-4672-b154-bb7d10c7194e.jpeg?im_w=1200",
      preview: true

    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-687836808290227833/original/7eeece54-8f7f-4174-930c-4183879e564d.jpeg?im_w=1200",
      preview: true
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/56b2dc82-ed11-46a4-bf86-eb0bba5c2366.jpg?im_w=960",
      preview: true

    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/e3fffbaa-fb47-43bf-b153-e4a8ac6c472a.jpg?im_w=960",
      preview: true
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/2e5ce6c9-4935-49ce-891e-e6f7251a8590.jpg?im_w=960",
      preview: true
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/f0a1c44a-9db9-436a-841a-aa550b3d9f6e.jpg?im_w=960",
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
