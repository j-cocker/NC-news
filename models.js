const db = require("./db/connection");

exports.fetchTopics = async () => {
    const topics = await db.query(`SELECT slug, description FROM topics`);
    return topics;
};
exports.fetchArticles = async () => {
    const articles = await db.query(
        `SELECT articles.article_id, title, articles.author, topic, articles.created_at, articles.votes, article_img_url, 
            COUNT(comments.article_id)::INT AS comment_count 
            FROM articles 
            LEFT JOIN comments USING (article_id) 
            GROUP BY articles.article_id 
            ORDER BY articles.created_at DESC`
    );
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
