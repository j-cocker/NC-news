const { fetchValidParam } = require("../models/models");

const { removeComment } = require("../models/delete-models");

const checkValueExists = async ({ param, column, table }) => {
    const isValid = await fetchValidParam({ param, column, table });
    if (isValid) return;

    const error = {
        status: 404,
        msg: `path not found`,
    };
    throw error;
};

exports.deleteComment = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        await checkValueExists({
            param: comment_id,
            column: "comment_id",
            table: "comments",
        });
        removeComment({ comment_id });
        res.status(204).send({});
    } catch (err) {
        next(err);
    }
};
