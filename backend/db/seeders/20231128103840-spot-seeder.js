'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models');
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const spotsSeeder = [
  {
    ownerId: 1,
    address: 'Tranquility Base, Mare Serenitatis, Moon',
    city: 'Moon',
    state: 'Moon',
    country: 'Moon',
    lat: 28.0506,
    lng: -15.4542,
    name: "Lunar Landing Resort",
    description: "Experience weightlessness and lunar luxury in this futuristic resort built into a crater's edge. Gaze at Earth from your moonlit suite, enjoy lunar rover tours, and dine in a rotating restaurant with panoramic views!",
    price: 5666
  },
  {
    ownerId: 1,
    address: 'Heron Island, Great Barrier Reef, Australia',
    city: 'Gladstone',
    state: 'Queensland',
    country: 'Australia',
    lat: -23.1492,
    lng: 151.9103,
    name: "Underwater Coral Palace, Great Barrier Reef",
    description: "Dive into an underwater wonderland without getting wet! This breathtaking hotel, suspended amidst vibrant coral reefs, offers panoramic ocean views from its glass-walled suites. Swim with tropical fish, learn about marine conservation, and indulge in spa treatments with coral-infused products.",
    price: 1999
  },
  {
    ownerId: 2,
    address: 'Above Burj Khalifa, Dubai, UAE',
    city: 'Dubai',
    state: 'Dubai',
    country: 'United Arab Emirates',
    lat: 25.1954,
    lng: 55.2765,
    name: "Sky City Floating Hotel",
    description: "Take luxury to new heights in this ultra-modern hotel tethered to a blimp above Dubai's iconic skyline. Savor breathtaking 360° views from your cloud-kissed suite, enjoy infinity pool dips with panoramic vistas, and dine in gourmet restaurants under starry skies.",
    price: 1888
  },
  {
    ownerId: 2,
    address: 'Rio Negro, Amazonas, Brazil',
    city: 'Manaus',
    state: 'Amazonas',
    country: 'Brazil',
    lat: -3.1027,
    lng: -60.0240,
    name: "Amazon Rainforest Canopy Treehouse Village",
    description: "Immerse yourself in the emerald embrace of the Amazon rainforest in this network of sustainable treehouse suites connected by sky-bridges. Witness exotic wildlife from your private balcony, learn about rainforest ecology from expert guides, and sleep soundly to the symphony of jungle sounds.",
    price: 888
  },
  {
    ownerId: 3,
    address: 'Near Myvatn Lake, North Iceland',
    city: 'Akureyri',
    state: 'Akureyri',
    country: 'Iceland',
    lat: 65.6611,
    lng: -17.0003,
    name: "Volcano View Observatory Hotel",
    description: "Witness the raw power of nature in comfort at this observatory hotel overlooking Iceland's geothermal wonderland. Relax in volcanic rock-carved baths, stargaze under the aurora borealis, and enjoy front-row seats to erupting volcanoes from your suite's panoramic window.",
    price: 1314
  },
  {
    ownerId: 3,
    address: 'Svalbard Archipelago, Norway',
    city: 'Longyearbyen',
    state: 'Longyearbyen',
    country: 'Norway',
    lat: 78.2219,
    lng: 15.6409,
    name: "Arctic Ice Cave Hotel",
    description: "Experience the magic of the Arctic in this unique hotel carved into a sparkling ice cave. Sleep on glacial beds under shimmering ice formations, explore nearby frozen landscapes on dog sleds, and witness the mesmerizing Northern Lights from your icy haven.",
    price: 699
  },
  {
    ownerId: 4,
    address: 'Geosynchronous orbit above Earth',
    city: 'Outer Space',
    state: 'Outer Space',
    country: 'Outer Space',
    lat: 67.1314,
    lng: 57.5201,
    name: "Space Elevator Orbital Hotel",
    description: "Experience zero gravity living at its finest in this luxurious hotel situated at the top of a space elevator. Enjoy breathtaking Earth views from your rotating suite, dine in gourmet restaurants with celestial panoramas, and even take a spacewalk for the ultimate adrenaline rush.",
    price: 9988
  },
  {
    ownerId: 4,
    address: 'Marina Bay, Singapore',
    city: 'Singapore',
    state: 'Singapore',
    country: 'Singapore',
    lat: 1.2905,
    lng: 103.8565,
    name: "Vertical Rainforest Megacity Hotel",
    description: "Ascend into a verdant paradise within this towering rainforest metropolis. Explore cascading waterfalls, lush gardens, and even bioluminescent caves within the hotel's structure. Discover exotic wildlife, savor locally-sourced cuisine in sky-high restaurants, and swim in infinity pools overlooking the bustling city below.",
    price: 888
  },
  {
    ownerId: 5,
    address: 'Mariana Trench, Pacific Ocean',
    city: 'Mariana Trench',
    state: 'Mariana Trench',
    country: 'Mariana Trench',
    lat: -11.3445,
    lng: 142.6910,
    name: "Deep Sea Hydrothermal Vent Spa Resort",
    description: "Plunge into the inky depths of the ocean in this underwater spa resort nestled near a hydrothermal vent. Relax in mineral-rich baths heated by volcanic fissures, witness bioluminescent creatures in the surrounding darkness, and enjoy underwater spa treatments that utilize deep-sea ingredients.",
    price: 788
  },
  {
    ownerId: 5,
    address: 'Palm Jumeirah, Dubai, UAE',
    city: 'Dubai',
    state: 'Dubai',
    country: 'United Arab Emirates',
    lat: 25.1311,
    lng: 55.1369,
    name: "The Holographic Theatre Dome",
    description: "Immerse yourself in a world of limitless imagination within this revolutionary holographic theatre dome. Step into projected fantastical landscapes, interact with virtual characters, and experience mind-blowing performances that blur the lines between reality and illusion.",
    price: 388
  },
  {
    ownerId: 6,
    address: 'Soars above various international locations',
    city: 'Sky',
    state: 'Sky',
    country: 'Sky',
    lat: 23.1234,
    lng: 56.1234,
    name: "The Sky Pods: Luxury in the Clouds",
    description: "Embrace the nomadic life of luxury in these high-tech, self-sustainable flying pods. Experience breathtaking panoramas from your cloud-kissed suite, customize your journey based on your desires, and enjoy unparalleled freedom and privacy as you glide across the skies.",
    price: 578
  },
  {
    ownerId: 6,
    address: 'Landmannalaugar geothermal region, Iceland',
    city: 'Reykjavik',
    state: 'Reykjavik',
    country: 'Iceland',
    lat: 64.1954,
    lng: -19.0591,
    name: "The Geothermal Spa Sanctuary, Icelandic Highlands",
    description: "Find deep relaxation amidst geothermal wonders at this spa sanctuary nestled in Iceland's volcanic heartland. Bathe in mineral-rich hot springs, enjoy mud and steam treatments powered by volcanic heat, and unwind in rustic-chic suites with breathtaking mountain views.",
    price: 620
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {

    await Spot.bulkCreate( spotsSeeder, { validate: true });

  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: spotsSeeder.map(spot => spot.name) }
    }, {});
  }
};
