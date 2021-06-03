//Usres's routes

const express = require('express');
const router = express.Router();
const userQueries = require('../lib/user-queries');

// GET /users/:id
router.get('/:id', (req, res) => {

  //If cookie dosen't match url parameter, send an error menssage
  if (req.params.id !== req.cookies.user_id) {
    res.status(401).send('You are not allowed! Please login first.');
  } else {
    userQueries.getAllPollByUserId(req.params.id)
      .then(user => {
        const userId = user[0].user_id;

        const userName = user[0].user_name;

        //Define a pollMap to store one user's all polls and their corresponding options
        const pollMap = new Map();
        //Define a pollName to store one user's all poll id and poll name
        const pollName = new Map();

        //Put one user's all polls and their options in pollMap
        for (const obj of user) {
          if (!pollMap.has(obj.poll_id)) {
            pollMap.set(obj.poll_id, new Set());
          }
          let eachPoll = pollMap.get(obj.poll_id);
          eachPoll.add({ optionId: obj.option_id, optionTitle: obj.option_title, rank: obj.sum_rank });
          //Put one user's all poll names in pollName
          pollName.set(obj.poll_id, obj.poll_name);
        }

        const templateVars = { userId, userName, pollName, pollMap };
        res.render("users.ejs", templateVars);
      })
      .catch(err => {
        console.log("Error:", err);
      });
  }
});

// POST /users/:id
//Delete polls
router.post('/:id', (req) => {
  userQueries.deletePoll(req.body.pollId)
    .catch(err => {
      console.log("Error:", err);
    });
});

module.exports = router;
