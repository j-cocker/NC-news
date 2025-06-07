const psqlErrCodes = [`22P02`];

exports.handleUnmatchedPath = (req, res) => {
    res.status(404).send({ msg: "path not found" });
};

exports.handleBadQuery = (err, req, res, next) => {
    if (!err.code && err.code !== psqlErrCodes[0]) {
        next(err);
    }
    res.status(400).send({ msg: `invalid request` });
};

exports.handleCustomError = (err, req, res, next) => {
    if (!(err.status && err.msg)) next(err);
    res.status(err.status).send({ msg: err.msg });
};

exports.handleServerError = (err, req, res, next) => {
    res.status(500).send({ msg: `Server error: ${err}` });
};
