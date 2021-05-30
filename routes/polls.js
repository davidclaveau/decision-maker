const express = require('express');
const router  = express.Router();
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

/*       let templateVars = {
        poll_id: pollResult[0]['poll_id']
      }
      for (const row of pollResult) {
        templateVars['option_id'] = row['option_id'];
        templateVars['title'] = row['title'];
        templateVars['sum_rank'] = row['sum_rank'];
      } */
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
      res.json(options);
    })
    .catch(err => {
      console.log("err", err.message);
    });
});

// POST /polls/:poll_id
// Submit my votes
router.post('/:poll_id', (req, res) => {
  pollQueries.postMyVotes(req.body.rank,req.body.optinId,req.body.voterName)
    .then(votes => {
      // res.json(polls);
    })
    .catch(err => {
      console.log("err", err.message);
    });
});
module.exports = router;
