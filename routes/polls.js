const express = require('express');
const router = express.Router();
const pollQueries = require('../lib/poll-queries');
const { sendCreatePollEmail, sendPollSubmissionEmail } = require('../mailgun/sendEmails');
const url = `http://localhost:8080`
// GET /polls/:poll_id/guest_name
router.get('/:poll_id/results/:guest_name', (req, res) => {
  pollQueries.getGuestAnswers(req.params.poll_id, req.params.guest_name)
    .then(poll => {
      res.json(poll);
    })
    .catch(err => {
      console.log("SometingWrong Here 1", err)
    });
});

// GET /:poll_id/results
router.get('/:poll_id/results', (req, res) => {
  pollQueries.getPollResults(req.params.poll_id)
  .then(pollResult => {
      // res.json(pollResult);
      let scores = [];
      const rankings = (score, index) => scores.indexOf(score) + 1
      for (const row of pollResult) {
        scores.push(row.sum_rank);
      }
      let standardRanking = scores.map(rankings)
      let templateVars = {
        rows: pollResult,
        rankings: standardRanking
      }
      res.render('../views/results.ejs', templateVars);
    })
    .catch(err => {
      console.log("SometingWrong Here 1", err);
    });
});

module.exports = router;



// GET /polls/:poll_id
//Get a poll
router.get('/:poll_id', (req, res) => {
  pollQueries.getOptions(req.params.poll_id)
    .then(options => {
      let user_answer = req.cookies['user_answer']
      const templateVar = {
        options,
        user_answer
      }
      res.render('../views/poll.ejs', templateVar);
    })
    .catch(err => {
      console.log("err", err.message);
    });
});

// POST /polls/:poll_id
// Submit my votes
router.post('/:poll_id', (req, res) => {
  const voterName = req.body['voter_name'];
  const optionsArr = req.body['option_id'];
  let rankScore = 1;
  const pollId = req.body['poll_id']

  res.cookie('user_answer', 'notNull');




  for (const option of optionsArr.reverse()) {
    pollQueries.postMyVotes(rankScore, parseInt(option), voterName)
    .catch(err => {
      console.log("err", err.message);
    });
    rankScore ++;
  }


  pollQueries.getUserNameEmailUserid(parseInt(pollId))
  .then((res) => {
    const resObj = res[0]
    const name = resObj.user_name;
    const email = resObj.user_email;
    const userId = resObj.user_id;

    const resultsLink = `${url}/polls/${pollId}/results`
    const usersLink = `${url}/users/${userId}`
    // sendPollSubmissionEmail(name, email, resultsLink, usersLink);
    res.end
  })
  .catch(err => {
    console.log("Error:", err)
  });

  res.json({
    message: "Success!"
  })

});

module.exports = router;
