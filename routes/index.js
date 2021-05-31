/*
 * All routes for index are defined here
 * Since this file is loaded in server.js into /index,
 *   these routes are mounted onto /index
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const indexQueries = require('../lib/index-queries');
const { sendCreatePollEmail } = require('../mailgun/sendEmails');

// For mailgun email, replace with domain
const url = `http://localhost:8080`

// GET /index
router.get('/', (req, res) => {
  res.render('index.ejs');
});

/*
 Create a poll, while finding all options and their descriptions. The options and descriptions will be passed to the query as arrays. These will then be looped in index-queries.js for each option and its respective description.
 */
// POST /index
router.post('/', (req, res) => {
  const name = req.body.pollName;
  const arr = Object.keys(req.body);
  const optionsArr = [];
  const descriptionsArr = [];

  arr.forEach(element => {
    if (element.startsWith("option")) {
      optionsArr.push(req.body[element])
    }
    if (element.startsWith("description")) {
      descriptionsArr.push(req.body[element])
    }
  })

  indexQueries.postIndex(name, req.cookies.user_id, optionsArr, descriptionsArr)
    .then(response => {
      const responseObj = response.rows[0]
      const pollId = responseObj.poll_id;
      res.redirect(`/polls/${pollId}`);
      return responseObj;
    })
    .then(obj => {
      const pollId = obj.poll_id;
      const name = obj.user_name;
      const email = obj.user_email;
      const resultsLink = `${url}/polls/${pollId}/results`
      const submissionLink = `${url}/polls/${pollId}`

      sendCreatePollEmail(name, email, resultsLink, submissionLink);
    })
    .catch(err => {
      console.log("Error:", err)
    });
});

module.exports = router;
