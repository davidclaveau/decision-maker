Decision Maker
=========

Decision Maker is a quick and easy way to create and share polls with your friends or colleagues.

## Screenshots

---

Create a poll with ease, and add as many options as you like. Don't like an options you've added? Delete it!
![]()

Once a poll is created, share the link with your friends! One link to bring users to the voting page - another link to see the results of the poll. The creator of the poll also receives an email using [Mailgun](https://www.mailgun.com/) with these two links.
![]()

To vote for a poll, drag-and-drop your preferred order. Enter your name to submit the poll. Click the option to see the description (if provided)
![]()

Users can only submit once!
![]()

The creator of the poll can see the results and the current leader of the poll. Using the [Borda count method](https://en.wikipedia.org/wiki/Borda_count), the poll will tally each submission based on each user's preference and show which option was voted for the most.
![]()

The user's page shows every poll created. A user can click each poll to see the poll results and can find the link to the poll page here as well. The user can also delete their poll as needed!
![]()

The app is response for mobile devices as well!
![]()

The following steps are only for _one_ of the group members to perform.

1. Create your own copy of this repo using the `Use This Template` button, ideally using the name of your project. The repo should be marked Public
2. Verify that the skeleton code now shows up in your repo on GitHub, you should be automatically redirected
3. Clone your copy of the repo to your dev machine
4. Add your team members as collaborators to the project so that they can push to this repo
5. Let your team members know the repo URL so that they use the same repo (they should _not_ create a copy/fork of this repo since that will add additional workflow complexity to the project)


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
