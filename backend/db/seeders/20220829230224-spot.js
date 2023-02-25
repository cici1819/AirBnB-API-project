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
      address: "2066 Peckatone Rd",
      country: "United States",
      lat: 38.095650,
      lng: -76.582498,
      price: 299.00,
      ownerId: 2
    },
    {
      name: "Gorgeous Home with Lake Views",
      description: "Amazing Victorian House , one of the best places to have a magnificent view of the Lake.",
      address: "790 South Shore Road",
      city: "Port Angeles",
      state: "WA",
      country: "United States",
      price: 200,
      lat: 48.073406,
      lng: -123.694936,
      ownerId: 3
    },
    {
      name: 'Lovely house on the hill',
      description: "Enter via private entrance on side of house.",
      address: '134 Sports Camp Dr',
      city: 'Woodward',
      state: 'PA',
      country: "United States",
      lat: 40.898664,
      lng: -77.364671,
      price: 220,
      ownerId: 4
    },

    {
      name: 'Pegasus Malibu',
      description: 'Perched above the Pacific Ocean, Eagle’s Watch has the best unobstructed panoramic view in Malibu.',
      ownerId: 5,
      city: 'Malibu',
      state: "CA",
      country: "United States",
      price: 118,
      address: '21458 Rambla Vista',
      lat: 34.039551,
      lng: -118.642341
    },
    {
      name: 'Caboose in the redwoods just outside of Cupertino',
      description: 'There are lots of nearby hiking and biking trails, as well as other exciting outdoor activities.',
      ownerId: 5,
      city: 'Cupertino',
      state: "CA",
      country: "United States",
      price: 190,
      address: '13100 Montebello Rd',
      lat: 37.289570,
      lng: -122.084877
    },
    {
      name: 'Unique & private hidden gem with spectacular views',
      description: 'Relax around 2 lakes, new sand Beach, 20 acres of grapes, horses, camels and many surprise species',
      ownerId: 1,
      city: 'Gilroy',
      state: "CA",
      country: "United States",
      price: 558,
      address: '3970 Leavesley Rd',
      lat: 37.042787,
      lng: -121.509720
    },
    {
      name: 'Anemomilos',
      description: "'It's a real old Windmill that worked to grind wheat and produce flour. This operation stopped with the appearance of the machines a few years later when it was used as a residence. ",
      ownerId: 1,
      city: 'Volimes',
      state: "Volime",
      country: "Greece",
      price: 180,
      address: 'Korithi Zakynthos',
      lat: 37.919154,
      lng: 20.697878
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
      name: "Sage Lodge A-frame Cabin",
      description: "Sage Lodge is a 70s A-Frame cabin in the woods. (Adults over 21 only) Look out at the majestic pine trees, or start a fire in the stone-covered fireplace.",
      ownerId: 2,
      city: 'Running Springs',
      state: 'California',
      country: 'United States',
      price: 228,
      address: '31845 Ridge Way',
      lat: 34.20840107973068,
      lng: -117.10843957392245,

    },
    {
      name: 'Paradise Ranch Inn- Awake House Hot Tub,Sauna',
      description: "Paradise Ranch is an “off the grid” 50-acre riverfront modern luxury eco-glamping ranch",
      ownerId: 1,
      city: 'Three Rivers',
      state: "CA",
      country: "United States",
      price: 300,
      address: '43365 Sierra Dr',
      lat: 36.448072,
      lng: -118.903242
    },

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {

    });
  }
};
