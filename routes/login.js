/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into /login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { options } = require('pg/lib/defaults');
const router  = express.Router();
const loginQueries = require('../lib/login-queries');

// GET /login
router.get('/', (req, res) => {
  res.render("login")
});

// POST /login
router.post('/', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  loginQueries.postUser(name, email)
    .then(response => {
      res.cookie("user_id", response.id);
      res.redirect('/')
    })
    .catch(err => {
      console.log("Error:", err)
    });
});

// GET /login/:id
router.get('/:user_id', (req, res) => {
  res.cookie("user_id", req.params.user_id);
  res.redirect('/')
});


module.exports = router;
