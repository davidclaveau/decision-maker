/*
 * All routes for errors are defined here
 * Since this file is loaded in server.js into /error,
 *   these routes are mounted onto /error
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// GET /error
router.get('/', (req, res) => {
  res.render("error")
});


module.exports = router;
