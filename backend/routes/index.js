// backend/routes/index.js
const express = require('express');
const router = express.Router();

//The main purpose of this Express application is to be a REST API server. All the API routes will be served at URL's starting with /api/.
const apiRouter = require('./api');
//All the URLs of the routes in the api router will be prefixed with /api
router.use('/api', apiRouter);

// Add a XSRF-TOKEN cookie
//to allow any developer to re-set the CSRF token cookie XSRF-TOKEN
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });

//test the reset XSRF_Token: http://localhost:8000/hello/world
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});



module.exports = router;
