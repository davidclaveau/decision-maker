const express = require('express');
const router = express.Router();
const pollQueries = require('../lib/poll-queries');

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
      let templateVars = {
        rows: pollResult
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

  for (const option of optionsArr.reverse()) {
    pollQueries.postMyVotes(rankScore, parseInt(option), voterName)
    .then(() => {
      const pollId = req.body['poll_id']
      res.redirect(`/polls/${pollId}/results`)
    })
    .catch(err => {
      console.log("err", err.message);
    });
    rankScore ++;
  }

  res.cookie('user_answer', req.body['option_id']);


});

module.exports = router;
