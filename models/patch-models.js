const db = require("../db/connection");
const format = require("pg-format");

exports.updateVotes = async ({ inc_votes, article_id }) => {
    const updatedField = await db.query(
        `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
        [inc_votes, article_id]
    );
    return updatedField.rows[0];
};
