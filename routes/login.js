/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into /login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// GET /login
router.get('/', (req, res) => {
  const templateVars = {
    userId: 0,
    userName: 'New User'
  }
  res.render("index", templateVars)
});

// GET /login/:id
router.get('/:user_id', (req, res) => {
  res.cookie("user_id", req.params.user_id);
  res.redirect('/')
});


module.exports = router;
