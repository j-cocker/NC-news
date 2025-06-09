const express = require("express");
//const db = require("./db/connection");
const endpoints = require("./endpoints.json");
const {
    getTopics,
    getArticles,
    getUsers,
    getArticle,
    getArticleComments,
} = require("./controllers/controllers.js");
const { postArticleComment } = require("./controllers/post-controllers.js");
const { patchArticle } = require("./controllers/patch-controllers.js");
const { deleteComment } = require("./controllers/delete-controllers.js");
const {
    handleUnmatchedPath,
    handleBadQuery,
    handleCustomError,
    handleServerError,
} = require("./controllers/error-controllers.js");

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
    res.status(200).send({ endpoints });
});

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/users", getUsers);
app.get("/api/articles/:article_id", getArticle);
app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postArticleComment);

app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.all("/*splat", handleUnmatchedPath);

app.use(handleBadQuery);
app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;
