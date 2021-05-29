const db = require('./connection');

const getPolls = () => {
  return db.query('SELECT * FROM polls;')
    .then((response) => {
      return response.rows;
    });
};

const getPollsById = (id) => {
  return db.query(`SELECT * FROM polls WHERE id = $1`, [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getPolls,
  getPollsById
};
