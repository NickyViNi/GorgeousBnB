const router = require('express').Router();
const { googleMapsAPIKey } = require('../../config');

router.post('/key', (req, res) => {
  res.json({ googleMapsAPIKey });
});

module.exports = router;

/*
We're using a POST route because this gives you the option to send a public key to the backend to encrypt the API key
so that it doesn't get taken in transit from the backend to the frontend. For our example, we won't go through all of
that. We can also make use of the CSRF protection we have enabled in our app, and even add some middleware to protect
against bad actors. Also, the actual endpoint doesn't have to be exactly like the one in this example, this was just
chosen to be specific about what the endpoint should return.
*/
