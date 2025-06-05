const {
    fetchTopics,
    fetchArticles,
    fetchUsers,
    fetchArticle,
} = require("./models");

exports.getTopics = async (req, res) => {
    try {
        const { rows } = await fetchTopics();
        return res.status(200).send({ topics: rows });
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

exports.getArticle = async (req, res) => {
    const { article_id } = req.params;
    try {
        const { rows } = await fetchArticle(article_id);
        res.status(200).send({ article: rows[0] });
    } catch (err) {
        console.log(err);
    }
};
