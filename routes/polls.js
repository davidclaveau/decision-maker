const express = require("express");
const router = express.Router();
const pollQueries = require("../lib/poll-queries");
const {
  sendCreatePollEmail,
  sendPollSubmissionEmail,
} = require("../mailgun/sendEmails");
const url = `http://localhost:8080`;

// GET /:poll_id/results
router.get("/:poll_id/results", (req, res) => {
  //select poll_id, option_id, polls.name and scores using left join
  pollQueries
    .getPollResults(req.params.poll_id)
    .then((pollResult) => {
      let templateVars = {
        rows: pollResult,
      };
      pollQueries
        .getVoterNum(req.params.poll_id)
        .then((num) => {
          //when there is no vote the ejs cannot read num as undefind,
          //check if the query result is empty, if yes, throw a message.
          if (num.length === 0) {
            (templateVars.num = "0"),
              (templateVars.rankings = ["No Participants Yet"]);
            templateVars.sum_rank = [];

          //manully assign scores 0 for each option when there is no votes
            for (const row of templateVars.rows) {
              templateVars.sum_rank.push("0");
            }
          } else {
            templateVars.num = num[0].num_voters;
            //score tie breaker function to rank oprions correctly
            let scores = [];
            const rankings = (score, index) => scores.indexOf(score) + 1;
            for (const row of num) {
              scores.push(row.sum_rank);
            }
            let standardRanking = scores.map(rankings);
            templateVars.rankings = standardRanking;
            templateVars.sum_rank = scores;
          }
          //pass in user_id and user_name for header ejs template
          pollQueries
            .getUserNameEmailUserid(req.params.poll_id)
            .then((data) => {
              templateVars.userId = data[0].user_id;
              templateVars.userName = data[0].user_name;

              res.render("../views/results.ejs", templateVars);
            })
            .catch((err) => {
              console.log("Something Wrong Here 4", err);
            });
        })
        .catch((err) => {
          console.log("Something Wrong Here 3", err);
        });
    })
    .catch((err) => {
      console.log("Something Wrong Here 1", err);
    });
});


// GET /polls/:poll_id
router.get("/:poll_id", (req, res) => {
  pollQueries
    .getOptions(req.params.poll_id)
    .then((options) => {
      //pass cookie data to ejs to make sure no spamming
      let poll_id = req.cookies["poll_id"];
      const templateVar = {
        options,
        poll_id,
      };
      pollQueries.getUserNameEmailUserid(req.params.poll_id).then((data) => {
        templateVar.userId = data[0].user_id;
        templateVar.userName = data[0].user_name;

        res.render("../views/poll.ejs", templateVar);
      })
      .catch((err) => {
        console.log("err 5", err.message);
      });

    })
    .catch((err) => {
      console.log("err 6", err.message);
    });
});

// POST /polls/:poll_id
// Submit my votes
let cookiePoll = [];
router.post("/:poll_id", (req, res) => {
  const voterName = req.body["voter_name"];
  const optionsArr = req.body["option_id"];
  let rankScore = 1;
  const pollId = req.body["poll_id"];
  cookiePoll.push(parseInt(pollId));
  //set up cookie after submission
  res.cookie("poll_id", cookiePoll);

  //insert new rows into db
  for (const option of optionsArr.reverse()) {
    pollQueries
      .postMyVotes(rankScore, parseInt(option), voterName)
      .catch((err) => {
        console.log("err", err.message);
      });
    rankScore++;
  }

  //send email to creator by using mailgun api
  pollQueries
    .getUserNameEmailUserid(parseInt(pollId))
    .then((res) => {
      const resObj = res[0];
      const name = resObj.user_name;
      const email = resObj.user_email;
      const userId = resObj.user_id;
      const resultsLink = `${url}/polls/${pollId}/results`;
      const usersLink = `${url}/users/${userId}`;
      sendPollSubmissionEmail(name, email, resultsLink, usersLink);
      res.end;
    })
    .catch((err) => {
      console.log("Error:", err);
    });
  //sending back response! important!
  res.json({
    message: "Success!",
  });
});

module.exports = router;
