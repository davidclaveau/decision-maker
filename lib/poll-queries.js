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

// get poll name and all its options
const getOptions = (pollId) => {
  const queryStatement=`SELECT polls.name,options.title,options.description From options JOIN polls ON polls.id=options.poll_id WHERE poll_id=$1;`;
  const queryParam=[pollId];
  return db.query(queryStatement,queryParam)
    .then((response) => {
      return response.rows;
    });
};

//post votes
//make rank,optionId,voterName as array
const postMyVotes = (rank,optionId,voterName) => {
  const queryStatement=`INSERT INTO votes (rank,option_id,voter_name) VALUES($1,$2,$3);`;
  const queryParam=[rank,optionId,voterName];
  return db.query(queryStatement,queryParam)
    .then((response) => {
      console.log("response", response)
      return response.rows;
    });
};

module.exports = {
  getPolls,
  getPollsById,
  getOptions,
  postMyVotes
};
