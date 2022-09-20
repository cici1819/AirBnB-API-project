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
      description: "Appartment.Style. Simplicity. Serenity. Welcome to our oasis in the heart of Manhattan, steps from 57th and Park. Carefully curated with world-class designer furniture, we’ve spared no expense in providing you with luxury surroundings while making you feel comfortable and at home. If you crave the authentic, personalized experience of staying in an Airbnb PLUS all the comforts and safety of a hotel, then look no more.",
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
      name: "Gorgeous Home with Large Golden Gate Bridge Views!",
      description: "Enjoy living in this airy and spacious Mediterranean- style home. Marble counters, custom cabinetry, and hardwood flooring make this home very appealing.",
      address: "43 Emerson St",
      city: "San Francisco",
      state: "CA",
      country: "United States",
      lat: 37.783160,
      lng: -122.448510,
      price: 260.00,
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
      description: "Enter via private entrance on side of house. Key pad entry, no check-in required. You have access to full house with two full bedrooms, one bath, a den, separate living area, and full kitchen. Includes full size washer and dryer.",
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
      name: '3 bedroom unit right near Dodger Stadium',
      description: '3 bedroom unit minutes from LA Dodgers stadium. Beautiful Views nearby.',
      ownerId: 5,
      city: 'Los Angeles',
      state: "CA",
      country: "United States",
      price: 158,
      address: '1333 Innes Ave',
      lat: 34.071425,
      lng: -118.249807
    }

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {

    });
  }
};
