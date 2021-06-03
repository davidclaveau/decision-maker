/*
 * All routes for register are defined here
 * Since this file is loaded in server.js into /register,
 *   these routes are mounted onto /register
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const registerQueries = require('../lib/register-queries');


// GET /register
router.get('/', (req, res) => {
  const templateVars = {
    userId: 0,
    userName: 'New User'
  }
  res.render("register", templateVars)
});

// POST /register
router.post('/', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

 registerQueries.postUser(name, email)
    .then(response => {
      res.cookie("user_id", response.id);
      res.redirect('/')
    })
    .catch(err => {
      res.render("error.ejs");
    });
});


module.exports = router;

