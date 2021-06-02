/*
 * All routes for index are defined here
 * Since this file is loaded in server.js into /index,
 * these routes are mounted onto /index
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const indexQueries = require('../lib/index-queries');
const { sendCreatePollEmail, sendPollSubmissionEmail } = require('../mailgun/sendEmails');

// For mailgun email, replace with domain
const url = `http://localhost:8080`

router.get('/', (req, res) => {
  const templateVars = {};

  indexQueries.getUser(req.cookies.user_id)
    .then((user) => {
      templateVars["userId"] = user.id;
      templateVars["userName"] = user.name;
      res.render('index.ejs', templateVars);
    })
});

/*
 Create a poll, while sorting all options and their descriptions.
 Then an object is created with the options and descriptions.
 These will be looped and queried for each option:description pair.
 Finally, a query for user and new poll to redirect user and send email.
 */

router.post('/', (req, res) => {
  const name = req.body.pollName;
  const arr = Object.keys(req.body);
  const optionsArr = [];

  //
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].startsWith("option")) {
      const optionObj = {};

      optionObj[req.body[arr[i]]] = req.body[arr[i + 1]];
      optionsArr.push(optionObj)
    }
  }


  indexQueries.postIndexPoll(name, req.cookies.user_id)
    .then((poll) => {
      return poll;
    })
    .then((poll) => {
      const id = poll.id;
      indexQueries.postIndexOption(id, optionsArr)

    })
  .catch(err => {
      console.log("Error1:", err)
    });
});

router.get('/links', (req, res) => {
  const id = req.cookies.user_id;
  indexQueries.getSubmittedPoll(id)
      .then((response) => {
        console.log("response.rows[0]", response.rows[0])
        res.json(response.rows[0])
        return response.rows[0];
    })
});

module.exports = router;
