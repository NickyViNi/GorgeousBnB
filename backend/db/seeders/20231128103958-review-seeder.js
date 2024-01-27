'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models');
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const reviewsSeeder = [
  {spotId: 7, userId: 1, stars: 5, review: "Zero-gravity yoga under a million stars? Lunar Landing Resort, you stole my moon-heart." },
  {spotId: 7, userId: 2, stars: 4, review: "Gourmet moon-cheese paired with Earth-rise views? Pricey, but worth every lunar credit." },
  {spotId: 7, userId: 3, stars: 5, review: "Honeymoon in a moon-domed suite? Out-of-this-world romantic, but pack some space-sickness pills." },
  {spotId: 7, userId: 5, stars: 5, review: "Kids loved the moon-bounce arena, but Earth-like playgrounds would be lunar-ly awesome." },
  {spotId: 7, userId: 6, stars: 5, review: "Eco-friendly, but those biodomes feel like fancy moon-bubbles. Sustainability needs giant leaps, not small steps." },
  {spotId: 7, userId: 7, stars: 3, review: "Crater wall climbs, moon buggy races, and lunar golf? This resort rocks (literally)." },
  {spotId: 7, userId: 8, stars: 4, review: "Artificial gravity feels a bit off, but the research labs are a scientist's dream." },

  {spotId: 2, userId: 2, stars: 5, review: "Sleeping with fish? Coral Palace blew my fins off - a watery wonderland!" },
  {spotId: 2, userId: 3, stars: 3, review: "Snorkeling from my suite door, but plastic-free cocktails would be coral-tastic!" },
  {spotId: 2, userId: 4, stars: 5, review: "Sea turtles at breakfast, manta rays at moonlight swims - this reef retreat reigns supreme!" },
  {spotId: 2, userId: 5, stars: 4, review: "Ocean views are endless, but Wi-Fi's as patchy as a sunburnt starfish." },
  {spotId: 2, userId: 6, stars: 5, review: "Learning about coral conservation firsthand - this hotel dives deep for the planet!" },
  {spotId: 2, userId: 7, stars: 5, review: "Private beach is dreamy, but beware the jellyfish - ouch, that stings!" },
  {spotId: 2, userId: 8, stars: 5, review: "Eco-friendly paradise with a price tag like a sunken treasure chest - worth every pearl." },

  {spotId: 3, userId: 1, stars: 5, review: "Cityscape at my feet, clouds at eye level - Sky City lives up to its name, sky-high!" },
  {spotId: 3, userId: 3, stars: 4, review: "Infinity pool with endless views, but the wind gusts feel like a hurricane in slow motion." },
  {spotId: 3, userId: 4, stars: 4, review: "Champagne toasts above Dubai? This floating palace knows how to party (in the stratosphere)." },
  {spotId: 3, userId: 5, stars: 4, review: "The blimp sway takes some getting used to - like sleeping on a gentle ocean giant." },
  {spotId: 3, userId: 6, stars: 5, review: "Stargazing with panoramic windows? Forget telescopes, Sky City is its own observatory." },
  {spotId: 3, userId: 7, stars: 3, review: "Luxury with an airship price tag - my bank account still needs oxygen after this stay." },
  {spotId: 3, userId: 8, stars: 5, review: "Eco-friendly zeppelin technology? Sky City soars ahead in sustainable style." },

  {spotId: 4, userId: 1, stars: 4, review: "Not for the faint of heart: creaky bridges, jungle noises, and the occasional bat visitor!" },
  {spotId: 4, userId: 3, stars: 4, review: "Treetop trails and zip lines galore, but bring sturdy shoes - those jungle paths are slippery!" },
  {spotId: 4, userId: 4, stars: 4, review: "Dinner with a view: howler monkeys and fireflies from my private balcony - unforgettable!" },
  {spotId: 4, userId: 5, stars: 4, review: "Mosquito nets and bug spray are essential equipment - nature's welcome committee can be bitey." },
  {spotId: 4, userId: 6, stars: 5, review: "Learning about rainforest ecology while swinging in hammocks - this hotel truly immerses you!" },
  {spotId: 4, userId: 7, stars: 3, review: "Wi-Fi's as rare as a pink dolphin, but who needs screens when you have star-studded nights?" },
  {spotId: 4, userId: 8, stars: 5, review: "Sustainable design and local partnerships - this village gives back to the rainforest it calls home." },

  {spotId: 5, userId: 1, stars: 5, review: "Front-row seats to fiery eruptions from my cozy lava-rock suite - molten magic!" },
  {spotId: 5, userId: 2, stars: 5, review: "Geothermal spa baths soothe volcano stress, but the sulfur smell takes some getting used to." },
  {spotId: 5, userId: 4, stars: 4, review: "Stargazing under a sky lit by lava flows - this hotel puts the 'hot' in hot springs!" },
  {spotId: 5, userId: 5, stars: 4, review: "Hiking to the crater rim was breathtaking, but bring sturdy boots - loose pumice is ankle-twistingly real." },
  {spotId: 5, userId: 6, stars: 5, review: "Learning about volcanic geology from resident experts - this hotel educates while it thrills." },
  {spotId: 5, userId: 7, stars: 4, review: "Eco-friendly design blends with the landscape - this hotel respects the fiery beast in its backyard." },
  {spotId: 5, userId: 8, stars: 3, review: "Not for the noise-sensitive: rumbling earth and occasional ash clouds come with the territory." },

  {spotId: 6, userId: 1, stars: 5, review: "Sleeping in an ice palace under the aurora borealis? Northern Lights, checkmate!" },
  {spotId: 6, userId: 2, stars: 5, review: "Sculpted ice beds are cool (literally), but bring your warmest PJs - frostbite is serious business." },
  {spotId: 6, userId: 4, stars: 5, review: "Dog sledding across glaciers, ice fishing in frozen lakes - this Arctic adventure bites!" },
  {spotId: 6, userId: 5, stars: 4, review: "The silence is deafening - a welcome escape from city noise, but maybe pack a good book." },
  {spotId: 6, userId: 6, stars: 5, review: "Learning about glacial ecology and Inuit culture - this hotel goes beyond frozen walls." },
  {spotId: 6, userId: 7, stars: 4, review: "Sustainable solar power and ice-replenishment tech - this hotel respects the delicate Arctic balance." },
  {spotId: 6, userId: 8, stars: 4, review: "Be prepared for the 'iceolation' effect - limited contact with the outside world (and maybe polar bears!)" },

  {spotId: 7, userId: 1, stars: 5, review: "Earth a swirling marble below, shooting stars at eye level - infinity pool with celestial views, anyone?" },
  {spotId: 7, userId: 2, stars: 4, review: "Weightlessness is fun, but space-walks cost like moon rockets - gotta budget for cosmic thrills." },
  {spotId: 7, userId: 3, stars: 4, review: "Rotating restaurant with stellar panoramas? Dining with a million-mile view, literally!" },
  {spotId: 7, userId: 5, stars: 5, review: "Zero-gravity yoga in the sky? Namaste from orbit, Earthlings! My downward dog has gone interstellar." },
  {spotId: 7, userId: 6, stars: 5, review: "The artificial gravity can feel a bit wonky - like walking on a tilted moon." },
  {spotId: 7, userId: 7, stars: 4, review: "Sustainable space tech and closed-loop systems - this hotel pioneers green living even among the stars." },
  {spotId: 7, userId: 8, stars: 4, review: "Not for claustrophobics: tight quarters and shared airlocks test your social (and spatial) skills." },

  {spotId: 8, userId: 1, stars: 5, review: "Walk-in waterfall showers, bioluminescent gardens in my room - this skyscraper's a living jungle dream!" },
  {spotId: 8, userId: 2, stars: 4, review: "Traffic jams in the sky-lanes? Just hop on a flying rickshaw for an aerial adventure!" },
  {spotId: 8, userId: 3, stars: 5, review: "Dine in clouds, shop amidst treetops, swim in infinity pools overlooking the city - vertical living's never been so lush!" },
  {spotId: 8, userId: 5, stars: 3, review: "Bring your noise-canceling headphones - waterfalls cascade, monkeys chatter, city hums, it's a sensory symphony!" },
  {spotId: 8, userId: 6, stars: 5, review: "Learn about sustainable urban design, rooftop farms, and vertical ecosystems - this megacity breathes green!" },
  {spotId: 8, userId: 7, stars: 3, review: "Brace for elevator waits - with thousands of residents and flying taxis, patience is a jungle virtue." },
  {spotId: 8, userId: 8, stars: 4, review: "Eco-friendly tech, renewable energy, zero-waste systems - this vertical wonder redefines responsible living." },

  {spotId: 9, userId: 1, stars: 5, review: "Bioluminescent massages by glowing jellyfish? Deep-sea spa is the new black (and blue)!" },
  {spotId: 9, userId: 2, stars: 4, review: "Pressure suits are comfy-ish, but dancing with giant tube worms takes some practice." },
  {spotId: 9, userId: 3, stars: 4, review: "Volcanic facials, mineral-rich baths heated by Earth's core - this spa dives into geothermal heaven!" },
  {spotId: 9, userId: 4, stars: 5, review: "Witnessing alien life forms at the vent? This resort takes 'exotic' to a whole new level!" },
  {spotId: 9, userId: 6, stars: 4, review: "The constant darkness takes some getting used to - bring your brightest inner glow (and a good audiobook)" },
  {spotId: 9, userId: 7, stars: 4, review: "Sustainable energy from vents, zero-waste tech, eco-conscious diving tours - this spa treads lightly on the deep sea." },
  {spotId: 9, userId: 8, stars: 3, review: "Not for the faint of heart: crushing depths, bioluminescent eeriness, and the occasional hungry anglerfish - adventure with a side of chills!" },

  {spotId: 10, userId: 1, stars: 5, review: "Tamed a T-Rex, danced with holograms on Mars, wept at a Shakespearean sunset - reality who? Holographic Dome, you win!" },
  {spotId: 10, userId: 2, stars: 5, review: "Touching holographic kittens? Mind-blown! This place redefines interactive entertainment." },
  {spotId: 10, userId: 3, stars: 4, review: "Price tag rivals a desert diamond mine - prepare to mortgage your reality for holographic thrills." },
  {spotId: 10, userId: 4, stars: 5, review: "Lost in a world of my own creation - the personalized story mode is pure escapism gold!" },
  {spotId: 10, userId: 6, stars: 5, review: "Can't tell the real Dubai from the projected one anymore - is this still the desert or a holographic oasis?" },
  {spotId: 10, userId: 7, stars: 4, review: "Sustainable energy powers the dreamworlds - this dome knows how to entertain responsibly." },
  {spotId: 10, userId: 8, stars: 4, review: "Beware the existential hangover - returning to reality after holographic adventures feels like waking from a technicolor dream." },

  {spotId: 11, userId: 1, stars: 5, review: "Sunrise breakfast above the Himalayas? My pod became my private mountain peak!" },
  {spotId: 11, userId: 2, stars: 4, review: "Dine with the stars, sleep on cloud nine - these pods redefine celestial living!" },
  {spotId: 11, userId: 3, stars: 4, review: "Pricey sky-rent, but waking up to eagle's-eye views makes it worth the stratospheric cost." },
  {spotId: 11, userId: 4, stars: 5, review: "On-demand weather changes? Sunset over Tahiti, then an Arctic aurora - my mood, my sky!" },
  {spotId: 11, userId: 5, stars: 4, review: "Tech glitches can dampen the view - once my pod got stuck in a rainbow loop (pretty, but dizzying)." },
  {spotId: 11, userId: 7, stars: 4, review: "Sustainable wind-powered pods, zero-waste tech - even luxury can tread lightly on the clouds." },
  {spotId: 11, userId: 8, stars: 5, review: "Not for the social butterflies - solitude comes at the cost of shared campfire stories or gossip sessions." },

  {spotId: 12, userId: 1, stars: 5, review: "Volcanic mud masks, milky lagoon dips, geyser-heated saunas - this spa melts away my stress like lava!" },
  {spotId: 12, userId: 2, stars: 4, review: "Northern Lights massages under the midnight sun? Magical, but the skeeters bite like mini-volcanoes." },
  {spotId: 12, userId: 3, stars: 4, review: "Dine in a moss-carpeted lava cave, hike to hidden geothermal springs - this sanctuary reconnects you to Earth's fiery heart." },
  {spotId: 12, userId: 4, stars: 5, review: "Learn about sustainable geothermal energy, volcanic geology - this spa educates while it pampers." },
  {spotId: 12, userId: 5, stars: 4, review: "The sulfur smell takes some getting used to - like bathing in dragon breath, but with amazing skin benefits. No Wi-Fi, no cell service, just the whisper of wind and the crackle of fire - prepare for a digital detox (and maybe some cabin fever)." },
  {spotId: 12, userId: 7, stars: 5, review: "Eco-friendly design blends with the landscape - this sanctuary respects the geothermal giant beneath its feet." },
  {spotId: 12, userId: 8, stars: 3, review: "Not for the city slickers: rugged terrain, unpredictable weather, and isolation test your wilderness chops (and tolerance for sheep)." },
]

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
    await Review.bulkCreate(reviewsSeeder, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {});
  }
};
