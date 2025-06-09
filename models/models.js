const db = require("../db/connection");
const format = require("pg-format");

const formatOrderBy = ({ sort_by, order }) => {
    let orderQuery = order ? order : "DESC";
    let sortQuery = sort_by ? sort_by : "created_at";
    return format(` ORDER BY articles.%I %s`, sortQuery, orderQuery);
};

const formatWhere = (queryObj) => {
    const field = Object.keys(queryObj)[0];
    if (!queryObj[field]) {
        return "";
    }
    return format(` WHERE %I = %L`, field, queryObj[field]);
};

exports.fetchTopics = async () => {
    const topics = await db.query(`SELECT slug, description FROM topics`);
    return topics;
};
exports.fetchArticles = async ({ sort_by, order, topic }) => {
    const orderClause = formatOrderBy({ sort_by, order });
    const whereClause = formatWhere({ topic });
    const formatQuery = `SELECT articles.article_id, title, articles.author, topic, articles.created_at, articles.votes, article_img_url, 
            COUNT(comments.article_id)::INT AS comment_count 
            FROM articles 
            LEFT JOIN comments USING (article_id) 
            ${whereClause}
            GROUP BY articles.article_id
            ${orderClause}`;
    const articles = await db.query(formatQuery);
    return articles;
};
exports.fetchUsers = async () => {
    const users = await db.query(`SELECT * FROM users`);
    return users;
};
exports.fetchArticle = async (article_id) => {
    const article = await db.query(
        `SELECT * FROM articles WHERE article_id = $1`,
        [article_id]
    );
    return article;
};

exports.fetchArticleComments = async (article_id) => {
    const comments = await db.query(
        `SELECT * FROM comments WHERE article_id = $1::INT`,
        [article_id]
    );
    return comments;
};

exports.fetchValidParam = async ({ param, column, table }) => {
    const query = format(
        `SELECT 1 FROM %I WHERE %I = %L`,
        table,
        column,
        param
    );
    const exists = await db.query(query);
    return exists.rows.length > 0;
};
