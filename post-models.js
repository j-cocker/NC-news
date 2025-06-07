const db = require("./db/connection");
const format = require("pg-format");

exports.addArticleComment = async ({ article, username, body }) => {
    const params = [article, username, body];
    const insertQuery = format(
        `INSERT INTO comments (article_id, author, body) VALUES %L RETURNING *`,
        [params]
    );
    const insertComment = await db.query(insertQuery);
    return insertComment.rows[0];
    
};
