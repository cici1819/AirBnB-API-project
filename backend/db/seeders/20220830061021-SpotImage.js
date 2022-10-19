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
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-32568567/original/704e23ed-680f-4672-b154-bb7d10c7194e.jpeg?im_w=1200",
      preview: true,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-33010488-unapproved/original/e5397e7f-252c-4afc-b6cb-01344233d8e6.JPEG?im_w=480",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-33010488-unapproved/original/ed046a89-9262-48ac-ab25-c01c923f562c.JPEG?im_w=720",
      preview: false,
    },

    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-33010488-unapproved/original/b4ecc9a1-9810-4b58-9f3c-dd3539e95f77.JPEG?im_w=720",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/cd730eb1-c618-47b7-aeb1-781a7059f9c7.jpg?im_w=1200",
      preview: false,
    },



    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-720310944656727446/original/ae6c7459-36d4-47c7-b017-63e55b2c2f71.jpeg?im_w=960",
      preview: true,
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-720310944656727446/original/a676e6f0-e6ff-4443-9448-12dbe846c72d.jpeg?im_w=480",
      preview: false,
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-720310944656727446/original/1ae2b758-1a63-490b-a762-55713f53517f.jpeg?im_w=720",
      preview: false,
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-720310944656727446/original/ced976cd-eb26-49b2-bc2e-178f44db9756.jpeg?im_w=720",
      preview: false,
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-720310944656727446/original/75325fe0-78a6-4961-a17c-b0423abc5486.jpeg?im_w=1200",
      preview: false
    },

    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-634384398560090584/original/ed3767ff-21f4-4786-a8f5-82c0b0a13fa4.jpeg?im_w=960",
      preview: true,
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-634384398560090584/original/25edc89a-d602-4812-bd7b-babb62e59b18.jpeg?im_w=480",
      preview: false,
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-634384398560090584/original/38693cd3-3a0b-4c3b-8be0-a6e3d10892fa.jpeg?im_w=480",
      preview: false,
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-634384398560090584/original/8cf3d2a2-d69d-486e-8295-eac83b622141.jpeg?im_w=480",
      preview: false,
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-634384398560090584/original/7c8820f4-fd36-45e4-901b-0c0dc57a89af.jpeg?im_w=1200",
      preview: false
    },


    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-52862569/original/c1570892-993b-4ba8-89cd-147b148f4150.jpeg?im_w=960",
      preview: true,
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-52862569/original/ff72cb37-5975-483e-8986-f2d4c8d6939a.jpeg?im_w=480",
      preview: false,

    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-52862569/original/eca122e3-6438-4bdd-a0d8-67f998210d56.jpeg?im_w=480",
      preview: false,
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-52862569/original/64372abb-314d-43ec-ab16-6f095f51b37d.jpeg?im_w=480",
      preview: false,
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-52862569/original/3e578d09-f596-48f8-9ed6-3e756f95db9f.jpeg?im_w=480",
      preview: false
    },


    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/2e5ce6c9-4935-49ce-891e-e6f7251a8590.jpg?im_w=960",
      preview: true,
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/9ec49502-f580-49a0-be66-d8d82b352a7a.jpg?im_w=720",
      preview: false,
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/438e6f30-1af5-4be4-8b51-4386258cd8e2.jpg?im_w=720",
      preview: false,
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/9b28c54c-71af-4684-a426-d34b0e2afb25.jpg?im_w=720",
      preview: false,
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/ef8a27ed-1929-49aa-8b1a-89b25dc7b0e0.jpg?im_w=720",
      preview: false
    },


    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-14886949/original/a9d72542-cd1f-418d-b070-a73035f94fe4.jpeg?im_w=960",
      preview: true,
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-14886949/original/b4793edc-0777-4846-b272-c7d9ba031e7d.jpeg?im_w=480",
      preview: false,
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-14886949/original/c16fc310-d5b4-4401-8092-85fcea57faf0.jpeg?im_w=480",
      preview: false,
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-14886949/original/0e0bde73-d928-4fe6-b79d-cdb19e593d16.jpeg?im_w=480",
      preview: false,
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-14886949/original/1de76753-6163-4206-92fb-c87b50fb7ac6.jpeg?im_w=480",
      preview: false
    },

    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/7f4cd00e-6ddf-40d1-9cf0-d4daca59a8ac.jpg?im_w=960",
      preview: true,
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/6cdf64ca-6688-4abf-8906-6e794d29ef9a.jpg?im_w=480",
      preview: false,
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/7b3f4f7e-5f04-481e-bca8-dd52e003cd11.jpg?im_w=480",
      preview: false,
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/84d2486c-daa7-4462-bcdc-b4f13342db7f.jpg?im_w=480",
      preview: false,
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/2a1ac842-0069-4712-83d2-fc759a7c4c51.jpg?im_w=480",
      preview: false
    },

    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/0fa1fc47-6fe4-4d32-8673-ba4f6df847aa.jpg?im_w=960",
      preview: true,
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/3921de22-a391-44e8-80b4-6f1dfde6809c.jpg?im_w=720",
      preview: false,
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/6c7dd06f-7bc2-4e8d-9dd4-990942888f6d.jpg?im_w=480",
      preview: false,
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/fa535a77-3858-4431-ba2c-87d8490adbdc.jpg?im_w=720",
      preview: false,
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/25aea43d-d1d5-422f-a463-98052b5b65ec.jpg",
      preview: false
    },

    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-54082509/original/5943f5c8-6d10-4483-b2de-5cba099f90db.jpeg",
      preview: true,
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-54082509/original/32d28388-9dff-4317-b05e-15a5e319a394.jpeg?im_w=1200",
      preview: false,
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-54082509/original/be14b745-3f83-45a4-b4e9-b4099ffae488.jpeg?im_w=1200",
      preview: false,
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-54082509/original/21e1de90-38f4-4a2c-8b06-912f63332f65.jpeg?im_w=1200",
      preview: false,
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-54082509/original/b9ad1caf-2d2d-4254-8d50-563a3e9e18ac.jpeg?im_w=720",
      preview: false
    },

    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/215bc4c6-0420-4d57-9979-3192df45346e.jpg?im_w=960",
      preview: true,
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/d19cd178-fd15-46a0-ba28-f6b10e44730b.jpg?im_w=720",
      preview: false,
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/f1d88198-79b3-48f1-a1e6-dbfec1aa5f1f.jpg?im_w=960",
      preview: false,
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/7f72dab5-ce6b-49a5-8b8f-4477fd0a9b61.jpg?im_w=480",
      preview: false,
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/2975edc4-ccb0-473c-997d-9837bd33f6bb.jpg?im_w=480",
      preview: false
    },

    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/88654563/6f41b3e9_original.jpg?im_w=960",
      preview: true,
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/86057225/4a620e39_original.jpg?im_w=720",
      preview: false,
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/86057470/8ca606f6_original.jpg?im_w=720",
      preview: false,
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/86060080/36657bdc_original.jpg?im_w=720",
      preview: false,
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/86062289/ec6953b0_original.jpg?im_w=720",
      preview: false
    },

    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-590620302190559469/original/e4a568dc-9091-40ed-b226-709dd7e6c31b.jpeg?im_w=960",
      preview: true,
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/6c5302ff-f2c7-4942-8cac-5c8b2f8d335e.jpg?im_w=480",
      preview: false,
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/053582f8-aa26-4e0e-aeca-3c15d8087d5c.jpg?im_w=480",
      preview: false,
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-590620302190559469/original/49defc79-18aa-4fdd-8f1c-2d6332f9c41c.png?im_w=480",
      preview: false,
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/b0c7255a-1dfd-4b97-8eff-8c01586421fe.jpg?im_w=480",
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
