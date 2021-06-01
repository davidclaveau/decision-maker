/*
 * All routes for index are defined here
 * Since this file is loaded in server.js into /index,
 * these routes are mounted onto /index
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const indexQueries = require('../lib/index-queries');
const { sendCreatePollEmail } = require('../mailgun/sendEmails');

// For mailgun email, replace with domain
const url = `http://localhost:8080`

router.get('/', (req, res) => {
  const templateVars = {};

  if (!req.cookies.user_id) {
    templateVars["user_id"] = -1;
  } else {
    templateVars["user_id"] = req.cookies.user_id;
  }

  console.log("templateVars", templateVars)

  res.render('index.ejs', templateVars);
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
  const optionsObj = {};

  console.log("arr.length", arr.length)

  // Get each option and their description into an object
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].startsWith("option")) {
      optionsObj[req.body[arr[i]]] = req.body[arr[i + 1]];
    }
  }

  indexQueries.postIndexPoll(name, req.cookies.user_id)
    .then((poll) => {
      return poll;
    })
  .then((poll) => {
    const id = poll.id;

    console.log("optionsObj", optionsObj)

    // Pass each option and description to insert in the options table
    for (const key in optionsObj) {
      indexQueries.postIndexOption(id, key, optionsObj[key])
      console.log("each option")
    }
  })
  // .then((id) => {

  //   // New query to get user and newly created poll id to redirect user and send email
  //   indexQueries.getIndexUserAndPoll(id)
  //     .then((response) => {
  //       console.log("Success:", response.rows[0]);
  //       const responseObj = response.rows[0]
  //       const pollId = responseObj.poll_id;
  //       const name = responseObj.user_name;
  //       const email = responseObj.user_email;
  //       const resultsLink = `${url}/polls/${pollId}/results`
  //       const submissionLink = `${url}/polls/${pollId}`


  //       // sendCreatePollEmail(name, email, resultsLink, submissionLink);
  //       return response.rows[0]
  //    })
  // })
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
