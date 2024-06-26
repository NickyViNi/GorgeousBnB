// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");
const spotsRouter = require('./spots.js');
const reviewRouter = require("./reviews.js");
const bookingRouter = require("./bookings.js");
const spotImageRouter = require("./spot-images.js");
const reviewImageRouter = require("./review-images.js");
const mapsRouter = require("./maps");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewRouter);

router.use("/bookings", bookingRouter);

router.use("/spot-images", spotImageRouter);

router.use("/review-images", reviewImageRouter);

router.use("/maps", mapsRouter);


// //test
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });

// // test1: GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// // test2: GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');
// router.use(restoreUser);
// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
//   }
// );

// // test3: GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
//   }
// );
















module.exports = router;
