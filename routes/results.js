const express = require('express');
const router  = express.Router();
const pollQueries = require('../lib/poll-queries');



// GET /results/:poll_id
router.get('/:poll_id', (req, res) => {
  pollQueries.getPollResults(req.params.poll_id)
  .then(pollResult => {
      res.json(pollResult);
    })
    .catch(err => {
      console.log("SometingWrong Here 1", err);
    });
});

module.exports = router;
