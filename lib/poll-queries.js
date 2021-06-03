const db = require("./connection");

//select participants number and scores
const getVoterNum = (poll_id) => {
  return db
    .query(
      `SELECT count(*) AS num_voters, sum(rank) AS sum_rank
    FROM polls JOIN options ON polls.id = poll_id
    JOIN votes ON options.id = option_id
    WHERE polls.id = $1
    GROUP BY polls.id, options.id
    ORDER BY sum_rank DESC;
   `,
      [poll_id]
    )
    .then((response) => {
      return response.rows;
    });
};

//select all info from polls table
const getPolls = () => {
  return db.query("SELECT * FROM polls;").then((response) => {
    return response.rows;
  });
};

//select a specific poll
const getPollsById = (id) => {
  return db
    .query(`SELECT * FROM polls WHERE id = $1`, [id])
    .then((response) => {
      return response.rows[0];
    });
};

// get poll name and all its options
const getOptions = (pollId) => {
  const queryStatement = `SELECT polls.id, polls.name,options.id AS option_id, options.title,options.description From options JOIN polls ON polls.id=options.poll_id WHERE poll_id=$1;`;
  const queryParam = [pollId];
  return db.query(queryStatement, queryParam).then((response) => {
    return response.rows;
  });
};

//post votes
//make rank,optionId as array
const postMyVotes = (rank, optionId, voterName) => {
  const queryStatement = `INSERT INTO votes (rank,option_id,voter_name) VALUES($1,$2,$3) RETURNING *;`;
  const queryParam = [rank, optionId, voterName];
  return db.query(queryStatement, queryParam).then((response) => {
    return response.rows;
  });
};


const getGuestAnswers = (poll_id, guest_name) => {
  return db
    .query(
      `SELECT *
  FROM polls JOIN options ON polls.id = poll_id
  JOIN votes ON options.id = option_id
  WHERE polls.id = $1 AND votes.voter_name = $2`,
      [poll_id, guest_name]
    )
    .then((response) => {
      return response.rows;
    });
};

const getPollResults = (poll_id) => {
  return db
    .query(
      `SELECT polls.id AS poll_id, options.id AS option_id, options.title, polls.name, sum(rank) AS scores
    FROM polls JOIN options ON polls.id = poll_id
    LEFT JOIN votes ON options.id = option_id
    WHERE polls.id = $1
    GROUP BY polls.id, options.id
    ORDER BY scores DESC;
   `,
      [poll_id]
    )
    .then((response) => {
      return response.rows;
    });
};

const getUserNameEmailUserid = (poll_id) => {
  return db
    .query(
      `SELECT users.name AS user_name, users.email AS user_email, users.id AS user_id
  FROM polls JOIN users ON owner_id = users.id
  WHERE polls.id = $1
 `,
      [poll_id]
    )
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getPolls,
  getPollsById,
  getGuestAnswers,
  getPollResults,
  getOptions,
  postMyVotes,
  getUserNameEmailUserid,
  getVoterNum,
};
