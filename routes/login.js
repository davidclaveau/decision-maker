/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into /login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { options } = require('pg/lib/defaults');
const router  = express.Router();


// GET /login
router.get('/:user_id', (req, res) => {
  console.log("res.cookie", res.cookie);

  res.cookie("user_id", req.params.user_id);
  console.log("res.cookie", res.cookie)

  res.redirect('/');
});

module.exports = router;
