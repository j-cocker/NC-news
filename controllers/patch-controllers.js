const { fetchValidParam } = require("../models/models");

const { updateVotes } = require("../models/patch-models");

const checkFields = (values) => {
    if (values.some((value) => !value)) {
        const error = { status: 400, msg: `invalid request` };
        throw error;
    }
    return;
};

const checkValueExists = async ({ param, column, table }) => {
    const isValid = await fetchValidParam({ param, column, table });
    if (isValid) return;

    const error = {
        status: 404,
        msg: `path not found`,
    };
    throw error;
};

exports.patchArticle = async (req, res, next) => {
    //
    try {
        const { article_id } = req.params;
        const { inc_votes } = req.body;
        checkFields([article_id, inc_votes]);
        await checkValueExists({
            param: article_id,
            column: "article_id",
            table: "articles",
        });

        const updatedArticle = await updateVotes({ inc_votes, article_id });
        res.status(200).send({ article: updatedArticle });
    } catch (err) {
        next(err);
    }
};
