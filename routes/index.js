/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const indexQueries = require('../lib/index-queries');

// GET /index
router.get('/', (req, res) => {
  res.render('index.ejs');
});

// POST /index
router.post('/', (req, res) => {
  const name = req.body.pollName;

  // These would probably do better in arrays
  const option1 = req.body.option1;
  const description1 = req.body.description1;

  indexQueries.postIndex(name, req.params.id, option1, description1)
    .then(res => {
      // console.log("res", res)
    })
    .catch(err => {
      console.log("Error:", err)
    });
});

module.exports = router;
