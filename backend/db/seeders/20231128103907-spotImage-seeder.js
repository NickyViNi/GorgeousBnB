'use strict';

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const spotImagesSeeder = [
  {spotId: 1, preview: true, url: 'https://i2-prod.mirror.co.uk/incoming/article7371033.ece/ALTERNATES/s1200d/Undated-handout-artists-impression-issued-by-Samsung.jpg'},
  {spotId: 1, preview: false, url: 'https://ichef.bbci.co.uk/images/ic/800xn/p00vynyx.jpg.webp'},
  {spotId: 1, preview: false, url: 'https://afar.brightspotcdn.com/dims4/default/69775c1/2147483647/strip/true/crop/1000x521+0+73/resize/840x438!/format/webp/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fc7%2Ff9%2Fc09ec6c3d5398fd5a347a130262b%2Foriginal-luxury-suite-rendering.jpg'},
  {spotId: 1, preview: false, url: 'https://preview.redd.it/future-planet-2-0-v0-du7utsn8sp2b1.png?width=1024&format=png&auto=webp&s=11f0f186f60a21545114197675560b80be9b8238'},
  {spotId: 1, preview: false, url: 'https://www.vendfun.com/wp-content/uploads/2023/09/vendfun-hotel-of-the-future-1024x575.jpg'},

  {spotId: 2, preview: true, url: 'https://storage.googleapis.com/pai-images/68e84b7b5e664219849987b9c6ce3696.jpeg'},
  {spotId: 2, preview: false, url: 'https://storage.googleapis.com/pai-images/ca575ef6cf534988b91b5bf6eb4234d6.jpeg'},
  {spotId: 2, preview: false, url: 'https://cdn.thisiswhyimbroke.com/images/conrad-hotel-underwater-640x533.jpg'},
  {spotId: 2, preview: false, url: 'https://robbreport.com/wp-content/uploads/2021/10/Conrad_Maldives10.jpg?w=1000'},
  {spotId: 2, preview: false, url: 'https://robbreport.com/wp-content/uploads/2021/10/Conrad_Maldives9.jpg'},

  {spotId: 3, preview: true, url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/8fc3d029356327.56be6693223a0.jpg'},
  {spotId: 3, preview: false, url: 'https://www.luxxu.net/blog/wp-content/uploads/2020/01/The-Worlds-Most-Exceptionally-Designed-Luxury-Hotel-Lobbies-4.jpg'},
  {spotId: 3, preview: false, url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/403025267.jpg?k=a84b7eb6b0b5685a6e7d9018a9de6271a1de687c2eb39a30e07bd34d9393cb2c&o=&hp=1'},
  {spotId: 3, preview: false, url: 'https://www.travelandleisure.com/thmb/GhpDZCZqmAHv-fX7xhtmHxhV6fI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/kakslauttanen-glass-guest-room-FINLAPLAND1220-2dd6c032730d463c81149a2546718ff6.jpg'},
  {spotId: 3, preview: false, url: 'https://t3.ftcdn.net/jpg/05/90/70/40/240_F_590704067_e1WbhHaCy9HaRcwUmmlFotLuN5if7TvH.jpg'},

  {spotId: 4, preview: true, url: 'https://media.cntraveler.com/photos/5defb719d606100008e7420f/16:9/w_1600%2Cc_limit/Four-Seasons-Resort-Bali-at-Sayan_2019_Resort-Exterior.jpg'},
  {spotId: 4, preview: false, url: 'https://media.cntraveler.com/photos/62aa2be6824df357ab8a7a2c/master/w_1600%2Cc_limit/Volcanoes%2520Bwindi%2520Lodge%2520%25C2%25A9%2520Sinamatella_Sinamatella%2520-%2520Uganda%2520-%2520Bwindi%2520-%252020180911%2520-%2520533.jpg'},
  {spotId: 4, preview: false, url: 'https://media.cntraveler.com/photos/62aa2be4a3d25572a6d332b1/master/w_1600%2Cc_limit/Sundy%2520Praia%2520Pri%25CC%2581ncipe%2520Island_Sundy%2520Praia-8.jpg'},
  {spotId: 4, preview: false, url: "https://media.cntraveler.com/photos/62aa2be9f05dcc0e79276924/master/w_1600%2Cc_limit/Copal%2520Tree%2520Lodge%2C%2520a%2520Muy'Ono%2520Resort_CTL%2520-%2520King%2520Jungle%2520Suite%2520Bedroom.jpg"},
  {spotId: 4, preview: false, url: 'https://media.cntraveler.com/photos/6246064b79f8935aaa2ef01a/master/w_1600%2Cc_limit/Silky%2520Oakes%2520Lodge_10.-Swimming-Pool.jpg'},
  {spotId: 4, preview: false, url: "https://media.cntraveler.com/photos/5defb719af04d700088a655e/master/w_1600%2Cc_limit/Four-Seasons-Resort-Bali-at-Sayan_2019_Resort-Lobby.jpg"},

  {spotId: 5, preview: true, url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ab/92/84/restaurant-and-standard.jpg?w=1200&h=-1&s=1'},
  {spotId: 5, preview: false, url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/83/bb/72/junior-suite.jpg?w=1200&h=-1&s=1'},
  {spotId: 5, preview: false, url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/74/b5/09/pool-at-the-arenal-observatory.jpg?w=1200&h=-1&s=1'},
  {spotId: 5, preview: false, url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/21/29/00/terrace-at-the-restaurant.jpg?w=1200&h=-1&s=1'},
  {spotId: 5, preview: false, url: 'https://cdn.openart.ai/stable_diffusion/653c980631a1a5d954b741885e88f14a9b628107_2000x2000.webp'},

  {spotId: 6, preview: true, url: 'https://www.icehotel.com/sites/cb_icehotel/files/styles/image_column_large/public/icehotel_deluxe-suite_kodex-maximus_design_julia-gamborg-nielsen_lotta-Lampa_photo_asaf-kliger-7.jpg?h=94fad35f&itok=U9nD9jCV'},
  {spotId: 6, preview: false, url: 'https://www.icehotel.com/sites/cb_icehotel/files/icehotel_deluxe-suite_kodex-maximus_design_julia-gamborg-nielsen_lotta-Lampa_photo_asaf-kliger-3.jpg'},
  {spotId: 6, preview: false, url: 'https://cdn.indagare.com/i/39263/w1080'},
  {spotId: 6, preview: false, url: 'https://cdn.indagare.com/i/39267/w1080'},
  {spotId: 6, preview: false, url: 'https://www.authentic-scandinavia.com/tours/sweden-ice-hotel/_/image/bb53dfe1-57da-4373-9cf4-97a1e3a77c9d:4028af216ef9bc29cb296df8f6877fa55fdfa7bc/width-1300/Photo_Asaf_Kliger_-_Icehotel_Jukkasj%C3%A4rvi_-_icehotel-northern-lights.jpg?quality=100'},
  {spotId: 6, preview: false, url: "https://cdn.travmedia.com/gallery/712913/712913_num1246711_585x585.jpg"},

  {spotId: 7, preview: true, url: "https://t3.ftcdn.net/jpg/06/11/53/58/240_F_611535880_ns9TDbWiOFSBSaxMtOOb5IQ0TxBr7b9X.jpg"},
  {spotId: 7, preview: false, url: 'https://t4.ftcdn.net/jpg/06/22/77/51/240_F_622775143_wTEy2jYd5J79D2IgTPfTOzAB6RmNs9Wi.jpg'},
  {spotId: 7, preview: false, url: 'https://t4.ftcdn.net/jpg/06/21/09/27/240_F_621092777_ShBcs0LndcrgBjPej5z6AklXA2HAoHeG.jpg'},
  {spotId: 7, preview: false, url: 'https://t3.ftcdn.net/jpg/05/68/22/24/240_F_568222459_pS9Dv7foiU4N3nUX2PwToqUKEmMCKLPs.jpg'},
  {spotId: 7, preview: false, url: 'https://t4.ftcdn.net/jpg/05/92/55/15/240_F_592551551_U2Ohbiff6wqkL7CCHwEahGdPjQK0Xfzg.jpg'},

  {spotId: 8, preview: true, url: "https://assets.newatlas.com/dims4/default/c213c15/2147483647/strip/true/crop/3000x2000+0+0/resize/840x560!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Fb5%2F0e%2F9eadef5149219d89b48791884d44%2Fppo-dsc1990.jpg"},
  {spotId: 8, preview: false, url: "https://assets.newatlas.com/dims4/default/7d85631/2147483647/strip/true/crop/3000x2000+0+0/resize/800x533!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F1d%2Fc7%2Fbd06de6f4be5b1a8d80638bf9abb%2Fppo-dsc2603.jpg" },
  {spotId: 8, preview: false, url: 'https://aasarchitecture.com/wp-content/uploads/2023/07/Xi-an-Lovi-Center-by-Aedas-06.jpg'},
  {spotId: 8, preview: false, url: 'https://musedesignawards.com/upload/entry/files/ME207172/10851644906685.jpg'},
  {spotId: 8, preview: false, url: 'https://www.thesun.co.uk/wp-content/uploads/2023/05/500-billion-futuristic-megacity-desert-765610795-1.jpg?w=620'},

  {spotId: 9, preview: true, url: "https://storage.googleapis.com/pai-images/f7ab21b7c5b040719f904c51ca71d554.jpeg"},
  {spotId: 9, preview: false, url: "https://storage.googleapis.com/pai-images/c767bedeeb354eb7a608c9cc6a90b2f7.jpeg"},
  {spotId: 9, preview: false, url: "https://images.adsttc.com/media/images/55e6/0f5f/2347/5d13/1000/001f/slideshow/ib1.jpg?1441140570"},
  {spotId: 9, preview: false, url: "https://images.adsttc.com/media/images/55e6/0f68/2347/5d13/1000/0020/slideshow/1d-2.jpg?1441140579"},
  {spotId: 9, preview: false, url: "https://hips.hearstapps.com/hmg-prod/images/blue-eye-cponant-photo-credits-to-christophe-dugied-1579703957.jpg?crop=0.735xw:1.00xh;0.134xw,0&resize=1200:*"},
  {spotId: 9, preview: false, url: "https://storage.googleapis.com/pai-images/a40cdec774a945dea8f48e210bf83c71.jpeg"},
  {spotId: 9, preview: false, url: "https://storage.googleapis.com/pai-images/1ed49c320783497dbeaa8a05f8634ee1.jpeg"},

  {spotId: 10, preview: true, url: "https://media.cnn.com/api/v1/images/stellar/prod/220922152154-01-moon-world-resort.jpg?c=original&q=h_618,c_fill"},
  {spotId: 10, preview: false, url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/90/18/60/the-ritz-carlton-dubai.jpg?w=1200&h=-1&s=1" },
  {spotId: 10, preview: false, url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/90/1a/93/the-ritz-carlton-dubai.jpg?w=1200&h=-1&s=1" },
  {spotId: 10, preview: false, url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/17/2b/3a/la-baie-lounge.jpg?w=1200&h=-1&s=1" },
  {spotId: 10, preview: false, url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/0c/7e/af/overall-view-of-the-4.jpg?w=1200&h=-1&s=1" },

  {spotId: 11, preview: true,  url: "https://media.cnn.com/api/v1/images/stellar/prod/220701134840-sky-hotel-video-3.jpg?q=w_1015,c_fill/f_webp" },
  {spotId: 11, preview: false, url: "https://media.cnn.com/api/v1/images/stellar/prod/220701134748-sky-hotel-video-2.jpg?q=w_1015,c_fill/f_webp" },
  {spotId: 11, preview: false, url: "https://www.travelandleisure.com/thmb/MAvxOngw_LYsE5SzOBmt1OLI5hk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/interior-white-desert-antartica-ANTECHOCAMP0222-bfc9598bcd6a4b35a0568d6f28cece71.jpg" },
  {spotId: 11, preview: false, url: "https://www.travelandleisure.com/thmb/gdSi5vnANTLBA3rjLUsNgaBpTDY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bedroom-white-desert-antartica-ANTECHOCAMP0222-8af9a1604e1943b582e031f94bf17c8a.jpg" },
  {spotId: 11, preview: false, url: "https://stupiddope.com/wp-content/uploads/2023/06/Five_Private_Jet7.jpg-copy.jpg" },

  {spotId: 12, preview: true,  url: "https://images.squarespace-cdn.com/content/v1/52c9f4ebe4b02c7007cdd86a/1695399726866-3XAYFKK9ZL310TGBLA3L/BL_Retreat_V4A0476_01.jpg?format=1000w" },
  {spotId: 12, preview: false, url: "https://images.squarespace-cdn.com/content/v1/52c9f4ebe4b02c7007cdd86a/1695399753193-MJEVP5ITMO1UK2ICBV67/BLUELAGOON.JPG?format=1000w" },
  {spotId: 12, preview: false, url: "https://images.squarespace-cdn.com/content/v1/52c9f4ebe4b02c7007cdd86a/1695399707319-8P9SAASIVI4PWGPJBPPV/Screenshot+2023-09-22+at+12.15.19+PM.png?format=1000w" },
  {spotId: 12, preview: false, url: "https://images.squarespace-cdn.com/content/v1/52c9f4ebe4b02c7007cdd86a/1695399745722-IZVF15IQVGUSGMB4V5N8/The+Retreat_lobby.jpg?format=1000w" },
  {spotId: 12, preview: false, url: "https://images.squarespace-cdn.com/content/v1/52c9f4ebe4b02c7007cdd86a/1530199390532-2QN6H6U5GWQBYRACTK15/BL_Retreat_Spa_Lagoon.jpg?format=1000w" },
  {spotId: 12, preview: false, url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/ff/38/cb/caption.jpg?w=1200&h=-1&s=1"},
  {spotId: 12, preview: false, url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/69/59/96/kerlingarfjoll-mountain.jpg?w=600&h=-1&s=1"}
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
    await SpotImage.bulkCreate( spotImagesSeeder, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {});
  }
};
