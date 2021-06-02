const { options } = require('pg/lib/defaults');
const db = require('./connection');


const postIndexPoll = (name, id) => {
  const queryStatement = `
    INSERT INTO polls (name, owner_id)
         VALUES ($1, $2) RETURNING *`
  return db.query(queryStatement, [name, id])
    .then((response) => {
      return response.rows[0];
    })
    .catch((err) => {
      console.log("Error2:", err)
    })
};

/*
 * Take the poll id and an array of objects with options and descriptions.
 * Create a multi-line query with each option and description.
 */

const postIndexOption = (id, optionsArr) => {
  let token = 1;
  let queryTokens = "";
  const allOptionsArr = [];

  for (let e = 0; e < optionsArr. length; e++) {
    // Get the current object's key (returns an array) and then the property
    const titleAsArr = Object.keys(optionsArr[e]);
    const title = titleAsArr[0];
    const description = optionsArr[e][title]

    allOptionsArr.push(title) // allOptionsArr.push(optionsArr[e]["title"])
    allOptionsArr.push(description)
    allOptionsArr.push(id)

    // Add to the query line the numerical tokens that will be inserted as VALUES
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
        console.log("Error3:", err)
    })
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
       WHERE options.poll_id = ${id};`

  return db.query(queryStatement);
};

const getSubmittedPoll = (id) => {
  const queryStatement = `
      SELECT polls.id
        FROM polls
        JOIN users ON users.id = polls.owner_id
       WHERE users.id = $1
       ORDER BY polls DESC
       LIMIT 1;
       `
  return db.query(queryStatement, [id]);
}

module.exports = {
  postIndexPoll,
  postIndexOption,
  getIndexUserAndPoll,
  getSubmittedPoll
};
