const db = require('./connection');

// Get the user to render header content
const getUser = (id) => {
  const queryStatement = `SELECT id, name, email FROM users WHERE $1 = id`;
  return db.query(queryStatement, [id])
    .then((response) => {
      console.log(response.rows[0]);
      return response.rows[0];
    })
    .catch((err) => {
      return err;
    });
};

// Insert the user's poll into the db
const postIndexPoll = (name, id) => {
  const queryStatement = `
    INSERT INTO polls (name, owner_id)
         VALUES ($1, $2) RETURNING *`
  return db.query(queryStatement, [name, id])
    .then((response) => {
      return response.rows[0];
    })
    .catch((err) => {
      return err;
    });
};

/*
 * Take the newly created poll id and an array of objects
 * that contains each added option and description.
 * Create a multi-line query with each option and description
 * to pass into the database.
 */
const postIndexOption = (id, optionsArr) => {
  let token = 1;
  let queryTokens = "";
  const allOptionsArr = [];

  for (let e = 0; e < optionsArr. length; e++) {
    // Get the current object's key (option) and then the property (description)
    const titleAsArr = Object.keys(optionsArr[e]);
    const title = titleAsArr[0];
    const description = optionsArr[e][title]

    allOptionsArr.push(title)
    allOptionsArr.push(description)
    allOptionsArr.push(id)

    // Add to the query line the numerical tokens that will be inserted as VALUES ($1, $2, $3)
    queryTokens += `($${token}, $${token + 1}, $${token + 2})`

    // Only add a comma if it's not the last line of the query
    e + 1 !== optionsArr.length ? queryTokens += "," : ""
    token += 3;
  }

  const queryStatement =
    `INSERT INTO options (title, description, poll_id)
          VALUES ${queryTokens}
          RETURNING *`
  return db.query(queryStatement, allOptionsArr)
    .then((response) => {
      return response.rows[0];
    })
    .catch((err) => {
      return err;
    });
};

// Get the newly created poll from the db
const getSubmittedPoll = (id) => {
  const queryStatement = `
      SELECT polls.id
        FROM polls
        JOIN users ON users.id = polls.owner_id
       WHERE users.id = $1
       ORDER BY polls DESC
       LIMIT 1;
       `;
  return db.query(queryStatement, [id]);
};

const getIndexUserAndPoll = (id) => {
  const queryStatement = `
      SELECT users.id as user_id,
             users.name as user_name,
             users.email as user_email,
             polls.id as poll_id
        FROM users
        JOIN polls ON users.id = polls.owner_id
        JOIN options ON polls.id = options.poll_id
       WHERE options.poll_id = ${id};`;

  return db.query(queryStatement);
};

module.exports = {
  getUser,
  postIndexPoll,
  postIndexOption,
  getIndexUserAndPoll,
  getSubmittedPoll
};
