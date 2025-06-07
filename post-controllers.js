const {
    fetchTopics,
    fetchArticles,
    fetchUsers,
    fetchArticle,
    fetchArticleComments,
    fetchValidParam,
} = require("./models");
const { addArticleComment } = require("./post-models");

const checkValidParam = async ({ param, column, table }) => {
    const isValid = await fetchValidParam({ param, column, table });
    if (isValid) return;

    const error = {
        status: 404,
        msg: `no ${table} found matching ${column}: ${param}`,
    };
    throw error;
};

exports.postArticleComment = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const { username, body } = req.body;
        const validUsername = checkValidParam({
            param: username,
            column: "username",
            table: "users",
        });
        const validArticle = checkValidParam({
            param: article_id,
            column: "article_id",
            table: "articles",
        });
        const validFields = Promise.all([validUsername, validArticle]);

        const newComment = await addArticleComment({
            article: article_id,
            username: username,
            body: body,
        });

        res.status(201).send({ comment: newComment });
    } catch (err) {
        next(err);
    }
};
