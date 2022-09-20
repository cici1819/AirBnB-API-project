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
    await queryInterface.bulkInsert('ReviewImages', [{
      reviewId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-32568567/original/ffc3057e-6c00-4e3a-b557-539d3dc1fc5f.jpeg?im_w=1200'
    },

    {
      reviewId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-687836808290227833/original/3c668832-6962-4861-91fe-dc6322ab82de.jpeg?im_w=1200'
    },

    {
      reviewId: 3,
      url: 'https://a0.muscache.com/im/pictures/f2b61129-04d7-4458-9289-d93a8803320c.jpg?im_w=1200'

    },
    {
      reviewId: 4,
      url: 'https://a0.muscache.com/im/pictures/8965a918-e3c1-44ad-b5a0-4e026ec969e1.jpg?im_w=1200'
    },
    {
      reviewId: 5,
      url: 'https://a0.muscache.com/im/pictures/ac99a0d5-8194-44b5-ace0-9d9d8c41a15f.jpg?im_w=1200'
    },
    {
      reviewId: 6,
      url: 'https://a0.muscache.com/im/pictures/91b3d33d-d2a5-48dc-b551-553283f65975.jpg?im_w=1200'
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
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
