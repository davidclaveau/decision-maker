const db = require('./connection');

const getIndex = () => {
  return db.query('SELECT * FROM polls;')
    .then((response) => {
      console.log("create poll rows", response.rows)
      return response.rows;
    });
};

const postIndex = (name, id, option1, description1) => {
  return db.query('INSERT INTO polls (name, owner_id) VALUES ($1, $2) RETURNING *', [name, id])
    .then((response) => {
      return response.rows[0];
    })
    .then((response) => {
      const optionId = response.id;
      return db.query('INSERT INTO options (title, description, poll_id) VALUES ($1, $2, $3) RETURNING *', [option1, description1, optionId])
    })
    .then((response) => {
      return response;
    })
};

// const postIndex = (option1, id) => {
//   return db.query('INSERT INTO polls (title, description, poll_id) VALUES ($1, $2);', [pollName, id])
//     .then((response) => {
//       console.log("response", response)
//       return response.rows;
//     });
// };

// const postIndex = (option2, id) => {
//   return db.query('INSERT INTO options (title, description, poll_id) VALUES ($1, $2);', [option2, id])
//     .then((response) => {
//       console.log("response", response)
//       return response.rows;
//     });
// };

// const postIndex = (option3, id) => {
//   return db.query('INSERT INTO polls (title, description, poll_id) VALUES ($1, $2);', [option3, id])
//     .then((response) => {
//       console.log("response", response)
//       return response.rows;
//     });
// };

// const postIndex = (option4, id) => {
//   return db.query('INSERT INTO polls (title, description, poll_id) VALUES ($1, $2);', [option4, id])
//     .then((response) => {
//       console.log("response", response)
//       return response.rows;
//     });
// };

module.exports = {
  getIndex,
  postIndex
};
