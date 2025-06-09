const {
    fetchTopics,
    fetchArticles,
    fetchUsers,
    fetchArticle,
    fetchArticleComments,
    fetchValidParam,
} = require("../models/models");
const { addArticleComment } = require("../models/post-models");
//const { checkFields } = require("../")

const checkValueExists = async ({ param, column, table }) => {
    const isValid = await fetchValidParam({ param, column, table });
    if (isValid) return;

    const error = {
        status: 400,
        msg: `invalid request`,
    };
    throw error;
};

const checkFields = (values) => {
    if (values.some((value) => !value)) {
        const error = { status: 400, msg: `invalid request` };
        throw error;
    }
    return;
};

exports.postArticleComment = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const { username, body } = req.body;
        checkFields([article_id, username, body]);
        const validUsername = checkValueExists({
            param: username,
            column: "username",
            table: "users",
        });
        const validArticle = checkValueExists({
            param: article_id,
            column: "article_id",
            table: "articles",
        });
        await Promise.all([validUsername, validArticle]);

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
