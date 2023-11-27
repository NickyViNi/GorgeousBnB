//This file will hold the resources for the route paths beginning with /api/session
// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Make a middleware called validateLogin that will check these keys and validate them:
//It checks to see whether or not req.body.credential and req.body.password are empty. If one of them is empty, then an error will be returned as the response.
const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];


// Log in : http://localhost:8000/api/session
router.post( '/', validateLogin, async (req, res, next) => {
      const { credential, password } = req.body;
      //Make sure to turn off the default scope so that you can read all the attributes of the user including hashedPassword
      const user = await User.unscoped().findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
      }

      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
);

//The DELETE /api/session logout route will remove the token cookie from the response and return a JSON success message.
// Log out
router.delete('/', (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

//The GET /api/session get session user route will return the session user as JSON under the key of user .
// Restore session user
router.get( '/', (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
      }
      else {
        return res.json({ user: null });
      }
    }
);




module.exports = router;
