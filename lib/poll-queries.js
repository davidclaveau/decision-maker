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
//make rank,optionId as array
const postMyVotes = (rank,optionId,voterName) => {
  const queryStatement=`INSERT INTO votes (rank,option_id,voter_name) VALUES($1,$2,$3);`;
  const queryParam=[rank[i],optionId[i],voterName];
  return db.query(queryStatement,queryParam)
    .then((response) => {
      console.log("response", response)
      return response.rows;
    });
};

const getGuestAnswers = (poll_id, guest_name) => {
  return db.query(`SELECT *
  FROM polls JOIN options ON polls.id = poll_id
  JOIN votes ON options.id = option_id
  WHERE polls.id = $1 AND votes.voter_name = $2`, [poll_id, guest_name])
    .then((response) => {
      return response.rows;
    });
};

const getPollResults = (poll_id) => {
  return db.query(`SELECT polls.id AS poll_id, options.id AS option_id, options.title, sum(rank) AS sum_rank
    FROM polls JOIN options ON polls.id = poll_id
    JOIN votes ON options.id = option_id
    WHERE polls.id = $1
    GROUP BY polls.id, options.id
    ORDER BY sum_rank;
   `, [poll_id])
    .then((response) => {
      console.log(poll_id)
      return response.rows;
    });
};



module.exports = {
  getPolls,
  getPollsById,
  getGuestAnswers,
  getPollResults,
  getOptions,
  postMyVotes
};
