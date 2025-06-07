const {
    fetchTopics,
    fetchArticles,
    fetchUsers,
    fetchArticle,
    fetchArticleComments,
    fetchValidParam,
} = require("./models");

const checkFetch = ({ rows, table, column, param }) => {
    if (rows.length > 0) return;
    const error = {
        status: 404,
        msg: `no ${table} found matching ${column}: ${param}`,
    };
    throw error;
};

const checkValidParam = async ({ param, column, table }) => {
    const isValid = await fetchValidParam({ param, column, table });
    if (isValid) return;

    const error = {
        status: 404,
        msg: `no ${table} found matching ${column}: ${param}`,
    };
    throw error;
};

exports.getTopics = async (req, res) => {
    try {
        const { rows } = await fetchTopics();
        res.status(200).send({ topics: rows });
    } catch (err) {}
};
exports.getArticles = async (req, res) => {
    try {
        const { rows } = await fetchArticles();
        res.status(200).send({ articles: rows });
    } catch (err) {}
};
exports.getUsers = async (req, res) => {
    try {
        const { rows } = await fetchUsers();
        res.status(200).send({ users: rows });
    } catch (err) {}
};

exports.getArticle = async (req, res, next) => {
    const { article_id } = req.params;
    try {
        const { rows } = await fetchArticle(article_id);
        checkFetch({
            rows,
            table: "articles",
            column: "article_id",
            param: article_id,
        });
        res.status(200).send({ article: rows[0] });
    } catch (err) {
        next(err);
    }
};

exports.getArticleComments = async (req, res, next) => {
    const { article_id } = req.params;
    try {
        const checkId = checkValidParam({
            param: article_id,
            column: "article_id",
            table: "articles",
        });
        const fetchComments = fetchArticleComments(article_id);
        const commentsWithCheck = await Promise.all([fetchComments, checkId]);
        const comments = commentsWithCheck[0].rows;

        res.status(200).send({ comments });
    } catch (err) {
        next(err);
    }
};
