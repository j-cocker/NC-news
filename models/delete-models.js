const db = require("../db/connection");
const format = require("pg-format");

exports.removeComment = async ({ comment_id }) => {
    db.query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id]);
};
