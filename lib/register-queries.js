const db = require('./connection');

const postUser = (name, email) => {
  const queryStatement = `
    INSERT INTO users (name, email)
         VALUES ($1, $2) RETURNING *;

  `;
  return db.query(queryStatement,[name, email])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  postUser
};
