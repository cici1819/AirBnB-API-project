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
    await queryInterface.bulkInsert('Spots', [{

      name: "Quiet Oasis Near Central Park",
      description: "Appartment.Style. Simplicity. Serenity. Welcome to our oasis in the heart of Manhattan, steps from 57th and Park. Carefully curated with world-class designer furniture, we’ve spared no expense in providing you with luxury surroundings while making you feel comfortable and at home. If you crave the authentic, personalized experience of staying in an Airbnb.",
      address: "65 E 55th St",
      city: "New York",
      state: "NY",
      country: "United States",
      lat: 40.760891,
      lng: -73.972130,
      price: 258.00,
      ownerId: 1,
    },
    {
      name: " Welcome aboard the Jolly Lodger pirate ship",
      description: "Just in time for Halloween, stay in comfort on a fully decorated pirate ship! ",
      city: "Callao",
      state: "Virginia",
      address: "43 Emerson St",
      country: "United States",
      lat: 35.783160,
      lng: -100.448510,
      price: 299.00,
      ownerId: 2
    },
    {
      name: "Gorgeous Home with Lake Views",
      description: "Amazing Victorian House , one of the best places to have a magnificent view of the Lake.",
      address: "Beaver Lake Marina",
      city: "Bentonville",
      state: "AR",
      country: "United States",
      price: 200,
      lat: 37.0902,
      lng: 95.7129,
      ownerId: 3
    },
    {
      name: 'Lovely house on the hill',
      description: "Enter via private entrance on side of house.",
      address: '4928 Forest Avenue',
      city: 'New York',
      state: 'New York',
      country: "United States",
      lat: -74.063934,
      lng: 40.722752,
      price: 220,
      ownerId: 4
    },

    {
      name: '2 bedroom unit right near Dodger Stadium',
      description: '2 bedroom unit minutes from LA Dodgers stadium. Beautiful parks nearby.',
      ownerId: 5,
      city: 'Los Angeles',
      state: "CA",
      country: "United States",
      price: 118,
      address: '1245 Innes Ave',
      lat: 34.071422,
      lng: -118.249808
    },
    {
      name: 'Caboose in the redwoods just outside of Cupertino',
      description: 'There are lots of nearby hiking and biking trails, as well as other exciting outdoor activities.',
      ownerId: 5,
      city: 'Cupertino',
      state: "CA",
      country: "United States",
      price: 190,
      address: '10682 Flora Vista Ave',
      lat: 34.071425,
      lng: -120.249807
    },
    {
      name: 'Unique & private hidden gem with spectacular views',
      description: 'Relax around 2 lakes, new sand Beach, 20 acres of grapes, horses, camels and many surprise species',
      ownerId: 1,
      city: 'Gilroy',
      state: "CA",
      country: "United States",
      price: 558,
      address: '475 N HUMBOLDT AVE',
      lat: 37.947948,
      lng: -122.038651
    },
    {
      name: 'Anemomilos',
      description: "'It's a real old Windmill that worked to grind wheat and produce flour. This operation stopped with the appearance of the machines a few years later when it was used as a residence. ",
      ownerId: 1,
      city: 'Volimes',
      state: "Volime",
      country: "Greece",
      price: 180,
      address: 'village Volimes',
      lat: 37.947948,
      lng: -122.038651
    },
    {
      name: 'Modern Farmhouse on Vineyard w Deck + Bocce Court',
      description: 'Wake up to the sound of birds and enjoy your morning coffee outside, watching the sun come up over the rows of vines.',
      ownerId: 1,
      city: 'Sonoma',
      state: "CA",
      country: "United States",
      price: 349,
      address: '280 Wilking Way',
      lat: 38.294960,
      lng: -122.447300
    },
    {
      name: 'Historic Luxurious Victorian, Garden View Room',
      description: 'Enjoy your Napa Valley adventure in this historic home.',
      ownerId: 3,
      city: 'Napa',
      state: "CA",
      country: "United States",
      price: 200,
      address: '2524 Rollingwood Dr',
      lat: 38.311730,
      lng: -122.322170
    },
    {
      name: 'Sunny Spacious 3BR/2BA Home-Hot Tub Retreat ',
      description: "It's nestled on the edge of an open field of trees, creeks, grassy fields, and wild animals!",
      ownerId: 2,
      city: 'Sonoma',
      state: "CA",
      country: "United States",
      price: 348,
      address: '23105 Millerick Rd',
      lat: 38.240530,
      lng: -122.449080

    },
    {
      name: 'Paradise Ranch Inn- Awake House Hot Tub,Sauna',
      description: "Paradise Ranch is an “off the grid” 50-acre riverfront modern luxury eco-glamping ranch",
      ownerId: 1,
      city: 'Three Rivers',
      state: "CA",
      country: "United States",
      price: 300,
      address: 'Mineral King Rd',
      lat: 38.240520,
      lng: -122.448809
    },

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {

    });
  }
};
