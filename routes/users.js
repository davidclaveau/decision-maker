/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../lib/user-queries');

// GET /api/users/:id
router.get('/:id', (req, res) => {
  userQueries.getUserById(req.params.id)
    .then(user => {
      const name = user[0].user_name;
      const polls = [];
      for (const obj of user) {
        polls.push(obj['poll_name']);
      }

      templateVars = { name, polls }
      res.render("users.ejs", templateVars);
    })
    .catch(err => {
      console.log("Error:", err)
    });
});

module.exports = router;
