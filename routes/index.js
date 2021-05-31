/*
 * All routes for index are defined here
 * Since this file is loaded in server.js into /index,
 *   these routes are mounted onto /index
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { options } = require('pg/lib/defaults');
const router  = express.Router();
const indexQueries = require('../lib/index-queries');

// GET /index
router.get('/', (req, res) => {
  res.render('index.ejs');
});

/*
 * Find all options and their descriptions. These
 * will be passed to the query as arrays as there can be
 * several options and descriptions for one poll. These will then
 * be looped in index-queries.js for each option and
 * its respective description.
 */
// POST /index
router.post('/', (req, res) => {
  const name = req.body.pollName;
  const arr = Object.keys(req.body);
  const optionsArr = [];
  const descriptionsArr = [];

  arr.forEach(element => {
    if (element.startsWith("option")) {
      optionsArr.push(req.body[element])
    }
    if (element.startsWith("description")) {
      descriptionsArr.push(req.body[element])
    }
  })

  indexQueries.postIndex(name, req.cookies.user_id, optionsArr, descriptionsArr)
    .then(response => {
      const pollId = response.id
      console.log("response", response)
      res.redirect(`/polls/${pollId}`);
    })
    .catch(err => {
      console.log("Error:", err)
    });
});

module.exports = router;
