const express = require('express');
const router  = express.Router();
const pollQueries = require('../lib/poll-queries');

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
