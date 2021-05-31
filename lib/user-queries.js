const db = require('./connection');

const getAllPollByUserId = (id) => {
  const queryStatement = `SELECT
  users.id AS user_id,
  users.name AS user_name,
  polls.id AS poll_id,
  polls.name AS poll_name,
  options.id AS option_id,
  options.title AS option_title,
  sum(rank) AS sum_rank
  FROM votes
  JOIN options ON option_id=options.id
  JOIN polls ON options.poll_id=polls.id
  JOIN users ON polls.owner_id=users.id
  GROUP BY users.id,polls.id,options.id
  HAVING users.id=$1
  ORDER BY options.poll_id,options.id`;
  return db.query(queryStatement,[id])
    .then((response) => {
      return response.rows;
    });
};


const deletePoll=(id)=>{
  const queryStatement ='DELETE FROM polls WHERE polls.id=$1;';
  return db.query(queryStatement,[id])
}


const getUser = (id) => {
  const queryStatement = `
  SELECT *
    FROM users
   WHERE id = $1
  `
  return db.query(queryStatement, [id])
    .then((response) => {
      return response.rows;
    })
}
module.exports = {
  getAllPollByUserId,
  deletePoll,
  getUser
};
