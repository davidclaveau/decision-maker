/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../lib/user-queries');

// GET /users/:id
router.get('/:id', (req, res) => {
  //if cookie dosen't match url parameter, send an error menssage
  if (req.params.id !== req.cookies.user_id) {
    res.status(401).send('You are not allowed! Please login first.');
  } else {
    userQueries.getAllPollByUserId(req.params.id)
      .then(user => {
        const userId = user[0].user_id;

        const userName = user[0].user_name;

        //define a pollMap to store one user's all polls and their corresponding options
        const pollMap = new Map();
        //define a pollName to store one user's all poll id and poll name
        const pollName = new Map();

        //put one user's all polls and their options in pollMap
        for (const obj of user) {
          if (!pollMap.has(obj.poll_id)) {
            pollMap.set(obj.poll_id, new Set());
          }
          let eachPoll = pollMap.get(obj.poll_id);
          eachPoll.add({ optionId: obj.option_id, optionTitle: obj.option_title, rank: obj.sum_rank });
          //put one user's all poll names in pollName
          pollName.set(obj.poll_id, obj.poll_name);
        }

        templateVars = { userId, userName, pollName, pollMap }
        res.render("users.ejs", templateVars);
      })
      .catch(err => {
        console.log("Error:", err)
      });
  }
});

router.post('/:id', (req, res) => {

  userQueries.deletePoll(req.body.pollId)
    .catch(err => {
      console.log("Error:", err)
    });
})

module.exports = router;
