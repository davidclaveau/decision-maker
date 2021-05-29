const db = require('./connection');

const getUserById = (id) => {
  return db.query(`
    SELECT users.name as user_name,
           polls.name as poll_name
      FROM users
      JOIN polls ON polls.owner_id = users.id
      WHERE users.id = $1;
    `, [id])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getUserById
};
