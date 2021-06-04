Decision Maker
=========

Decision Maker is a quick and easy way to create and share polls with your friends or colleagues.

## Screenshots

---

Create a poll with ease and add as many options as you like. Don't like an option you've added? Delete it!
![](https://raw.githubusercontent.com/davidclaveau/decision-maker/master/public/img/create-a-poll.png)

Once a poll is created, share the link with your friends! One link to bring users to the voting page - another link to see the results of the poll. The creator of the poll also receives an email using [Mailgun](https://www.mailgun.com/) with the same two links.
![](https://raw.githubusercontent.com/davidclaveau/decision-maker/master/public/img/share-a-poll.png)

To vote for a poll use drag-and-drop for your preferred order. Enter your name to submit the poll. Click the option to see the description (if provided)
![](https://raw.githubusercontent.com/davidclaveau/decision-maker/master/public/img/choose-your-favourites.png)

Users can only submit once!
![](https://raw.githubusercontent.com/davidclaveau/decision-maker/master/public/img/single-submission.png)

The creator of the poll can see the results and the current leader of the poll. Using the [Borda count method](https://en.wikipedia.org/wiki/Borda_count), the poll will tally each submission based on each user's preference and show which option was voted for the most.
![](https://raw.githubusercontent.com/davidclaveau/decision-maker/master/public/img/results-page.png)

The user's page shows every poll created. A user can click each poll to see the poll results and can find the link to the poll page here as well. The user can also delete their poll as needed!
![](https://raw.githubusercontent.com/davidclaveau/decision-maker/master/public/img/track-your-polls.png)

The app is response for mobile devices as well!
![](https://raw.githubusercontent.com/davidclaveau/decision-maker/master/public/img/responsive1.png)
![](https://raw.githubusercontent.com/davidclaveau/decision-maker/master/public/img/responsive2.png)
![](https://raw.githubusercontent.com/davidclaveau/decision-maker/master/public/img/responsive3.png)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at http://localhost:8080/.
4. Go to http://localhost:8080/ in your browser.

## Dependencies

- Body-parser
- Chalk
- Cookie-parser
- Dot-env
- EJS
- Express
- Mailgun
- Morgan
- Node 5.10.x or above
- Node SASS Middleware
- Postgres
- Postgres-native
