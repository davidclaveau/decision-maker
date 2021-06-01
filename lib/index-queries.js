const db = require('./connection');


/* Create the poll name and assign owner id, then pass in each
 * option and description from the arrays and loop for each INSERT.
 * Each option and description will be in the same position
 * in their respective arrays (option[0] corresponds to description[0], etc).
 *
 * We then send back a query with the poll_id (for redirect) and the
 * users.id, name, and email for sending out mailgun email.
 */
const postIndexPoll = (name, id) => {
  const queryStatement = `
    INSERT INTO polls (name, owner_id)
         VALUES ($1, $2) RETURNING *`
  return db.query(queryStatement, [name, id])
    .then((response) => {
      return response.rows[0];
    })
    .catch((err) => {
      console.log("Error:", err)
    })
};

const postIndexOption = (id, title, description) => {
  const queryStatement =
    `INSERT INTO options (title, description, poll_id)
          VALUES ($1, $2, $3) RETURNING *`
  return db.query(queryStatement, [title, description, id])
    .then((response) => {
      return response.rows[0];
    })
    .catch((err) => {
        console.log("Error:", err)
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

module.exports = {
  postIndexPoll,
  postIndexOption,
  getIndexUserAndPoll
};
