/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const pollQueries = require('../lib/poll-queries');

// GET /api/polls/
router.get('/', (req, res) => {
  pollQueries.getPolls()
    .then(polls => {
      res.json(polls);
    })
    .catch(err => {
      console.log("What do you want from me? 1", err)
    });
});

// GET /api/polls/:id
router.get('/:id', (req, res) => {
  pollQueries.getPollById(req.params.id)
    .then(poll => {
      res.json(poll);
    })
    .catch(err => {
      console.log("What do you want from me? 2", err)
    });
});

module.exports = router;

// (db) => {
//   router.get("/", (req, res) => {
//     db.query(`SELECT * FROM users;`)
//       .then(data => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
