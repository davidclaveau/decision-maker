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
 * Create a poll, while sorting all options and their descriptions.
 * To post the options and descriptions. an object is created for each option * and description as a key/value pair. Finally, a query for user and new
 * poll to redirect user and send email.
 */
router.post('/', (req, res) => {
  const name = req.body.pollName;
  const arr = Object.keys(req.body);
  const optionsArr = [];

  // Loop through req.body and create an array of objects
  // Each object has the key (option) and property (description)
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].startsWith("option")) {
      const optionObj = {};

      optionObj[req.body[arr[i]]] = req.body[arr[i + 1]];
      optionsArr.push(optionObj)
    }
  }

  // Post the poll and the options to the db.
  // Retrive poll id and user info for email send out
  indexQueries.postIndexPoll(name, req.cookies.user_id)
    .then((poll) => {
      return poll;
    })
    .then((poll) => {
      const id = poll.id;
      indexQueries.postIndexOption(id, optionsArr)
      return id;
    })
    .then((id) => {
      console.log("id", id)
      return indexQueries.getIndexUserAndPoll(id)
    })
    .then((result) => {
      const obj = result.rows[0]
      const pollId = obj.poll_id;
      const name = obj.user_name;
      const email = obj.user_email;
      const resultsLink = `${url}/polls/${pollId}/results`
      const submissionLink = `${url}/polls/${pollId}`

      sendCreatePollEmail(name, email, resultsLink, submissionLink);
    })
  .catch(err => {
      console.log("Error1:", err)
    });
});

// Get the newly created poll from the db
router.get('/links', (req, res) => {
  const id = req.cookies.user_id;
  indexQueries.getSubmittedPoll(id)
      .then((response) => {
        res.json(response.rows[0])
        return response.rows[0];
    })
});

module.exports = router;
