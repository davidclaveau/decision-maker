/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
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

  console.log("optionsArr", optionsArr);
  console.log("descriptionsArr", descriptionsArr);

  indexQueries.postIndex(name, req.params.id, optionsArr, descriptionsArr)
    .then(res => {
      // console.log("res", res)
    })
    .catch(err => {
      console.log("Error:", err)
    });
});

module.exports = router;
