const db = require('./connection');


/* Create the poll name and assign owner id, then pass in each
 * option and description from the arrays and loop for each INSERT.
 * Each option and description will be in the same position
 * in their respective arrays (option[0] corresponds to description[0], etc).
 */
const postIndex = (name, id, optionsArr, descriptionsArr) => {
  const queryStatement = `
    INSERT INTO polls (name, owner_id)
         VALUES ($1, $2) RETURNING *`

  return db.query(queryStatement, [name, id])
    .then((response) => {
      return response.rows[0];
    })
    .then((response) => {
      const optionId = response.id;

      for (let i = 0; i < optionsArr.length; i++) {
        const option = optionsArr[i];
        console.log("option", option);
        const description = descriptionsArr[i];
        console.log("description", description);
        db.query(
          `INSERT INTO options (title, description, poll_id)
                VALUES ($1, $2, $3) RETURNING *`, [option, description, optionId]
        );
      }
      return response;
    });
    // .then((response) => {
    //   const response.id

    //   const queryStatement = `
    //     SELECT users.id as user_id,
    //            users.name as user_name,
    //            users.email as user_email,
    //            polls.id as poll_id
    //       FROM users
    //       JOIN polls ON users.id = polls.owner_id;

    // })
};

module.exports = {
  postIndex
};
