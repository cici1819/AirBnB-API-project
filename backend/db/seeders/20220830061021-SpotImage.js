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
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot1-newyork-p.webp",
      preview: true,
    },
    {
      spotId: 1,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot1-1.webp",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot1-2.webp",
      preview: false,
    },

    {
      spotId: 1,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot1-3.webp",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot1-4.webp",
      preview: false,
    },



    {
      spotId: 2,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot2-p.webp",
      preview: true,
    },
    {
      spotId: 2,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot2-1.webp",
      preview: false,
    },
    {
      spotId: 2,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot2-2.webp",
      preview: false,
    },
    {
      spotId: 2,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot2-3.webp",
      preview: false,
    },
    {
      spotId: 2,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot2-4.webp",
      preview: false
    },

    {
      spotId: 3,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot3-p.webp",
      preview: true,
    },
    {
      spotId: 3,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot3-1.webp",
      preview: false,
    },
    {
      spotId: 3,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot3-2.webp",
      preview: false,
    },
    {
      spotId: 3,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot3-3.webp",
      preview: false,
    },
    {
      spotId: 3,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot3-4.webp",
      preview: false
    },


    {
      spotId: 4,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot4-p.webp",
      preview: true,
    },
    {
      spotId: 4,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot4-1.webp",
      preview: false,

    },
    {
      spotId: 4,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot4-2.webp",
      preview: false,
    },
    {
      spotId: 4,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot4-3.jpeg",
      preview: false,
    },
    {
      spotId: 4,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot4-4.webp",
      preview: false
    },


    {
      spotId: 5,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot5-p.webp",
      preview: true,
    },
    {
      spotId: 5,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot5-1.webp",
      preview: false,
    },
    {
      spotId: 5,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot5-2.webp",
      preview: false,
    },
    {
      spotId: 5,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot5-3.webp",
      preview: false,
    },
    {
      spotId: 5,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot5-4.webp",
      preview: false
    },


    {
      spotId: 6,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot6-p.webp",
      preview: true,
    },
    {
      spotId: 6,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot6-1.webp",
      preview: false,
    },
    {
      spotId: 6,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot6-2.webp",
      preview: false,
    },
    {
      spotId: 6,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot6-3.webp",
      preview: false,
    },
    {
      spotId: 6,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot6-4.webp",
      preview: false
    },

    {
      spotId: 7,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot7-p.webp",
      preview: true,
    },
    {
      spotId: 7,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot7-1.webp",
      preview: false,
    },
    {
      spotId: 7,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot7-2.webp",
      preview: false,
    },
    {
      spotId: 7,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot7-3.webp",
      preview: false,
    },
    {
      spotId: 7,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot7-4.webp",
      preview: false
    },

    {
      spotId: 8,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot8-p.webp",
      preview: true,
    },
    {
      spotId: 8,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot8-1.webp",
      preview: false,
    },
    {
      spotId: 8,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot8-2.webp",
      preview: false,
    },
    {
      spotId: 8,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot8-3.webp",
      preview: false,
    },
    {
      spotId: 8,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot8-4.jpg",
      preview: false
    },

    {
      spotId: 9,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot9-p.webp",
      preview: true,
    },
    {
      spotId: 9,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot9-1.webp",
      preview: false,
    },
    {
      spotId: 9,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot9-2.webp",
      preview: false,
    },
    {
      spotId: 9,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot9-3.webp",
      preview: false,
    },
    {
      spotId: 9,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot9-4.webp",
      preview: false
    },

    {
      spotId: 10,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot10-p.webp",
      preview: true,
    },
    {
      spotId: 10,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot10-1.webp",
      preview: false,
    },
    {
      spotId: 10,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot10-2.webp",
      preview: false,
    },
    {
      spotId: 10,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot10-3.webp",
      preview: false,
    },
    {
      spotId: 10,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot10-4.webp",
      preview: false
    },

    {
      spotId: 11,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot11-p.webp",
      preview: true,
    },
    {
      spotId: 11,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot11-1.webp",
      preview: false,
    },
    {
      spotId: 11,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot11-2.webp",
      preview: false,
    },
    {
      spotId: 11,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot11-3.webp",
      preview: false,
    },
    {
      spotId: 11,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot11-4.webp",
      preview: false
    },

    {
      spotId: 12,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot12-p.webp",
      preview: true,
    },
    {
      spotId: 12,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot12-1.webp",
      preview: false,
    },
    {
      spotId: 12,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot12-2.jpg",
      preview: false,
    },
    {
      spotId: 12,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot12-3.jpg",
      preview: false,
    },
    {
      spotId: 12,
      url: "https://cici-aa.s3.us-west-1.amazonaws.com/Aircnc/spot12-4.webp",
      preview: false
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
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
