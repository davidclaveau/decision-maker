const express = require('express');
const router  = express.Router();
const pollQueries = require('../lib/poll-queries');

// GET /polls/:poll_id/guest_name
router.get('/:poll_id/:guest_name', (req, res) => {
  pollQueries.getGuestAnswers(req.params.poll_id, req.params.guest_name)
    .then(poll => {
      res.json(poll);
    })
    .catch(err => {
      console.log("SometingWrong Here 1", err)
    });
});


module.exports = router;
