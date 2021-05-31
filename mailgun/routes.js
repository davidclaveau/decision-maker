const API_KEY = '97a3e683576c733e97c0c9ca9373e298-1d8af1f4-c1af59b3';
const DOMAIN = 'sandbox493c43bc09a34879a0c849f0266827d7.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

const data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'foo@example.com, bar@example.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

mailgun.messages().send(data, (error, body) => {
  console.log(body);
});
