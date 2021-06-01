require('dotenv').config();

const API_KEY = process.env.MG_API;
const DOMAIN = process.env.MG_DOMAIN;
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

/*
  Send the creator of a poll an email when they create a new poll.
  This will create an email with user's name, sent to their email and provide the user's newly created poll page and results page in the body of the email.
 */

const sendCreatePollEmail = (name, email, resultsLink, submissionLink) => {
  const data = {
    from: 'Decision Maker <decisionmaker@fengziodavid.com>',
    to: email,
    subject: `Hello ${name}!`,
    html:`
      <html>
        <body> The link to see the results: <a href="${resultsLink}">can be found here</a> and the link to share with your friends <a href="${submissionLink}">can be found here</a>
        </body>
      </html>`
  };
  return mailgun.messages().send(data, (error, body) => {
    if (error) {
      console.log("Error1:", error)
    }
    console.log("This should be sending emails:", body)
  });
}

module.exports = { sendCreatePollEmail };

