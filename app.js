const express = require("express");
//const db = require("./db/connection");
const endpoints = require("./endpoints.json");
const {
    getTopics,
    getArticles,
    getUsers,
    getArticle,
    getArticleComments,
} = require("./controllers");
const { postArticleComment } = require("./post-controllers");
const {
    handleUnmatchedPath,
    handleBadQuery,
    handleCustomError,
    handleServerError,
} = require("./error-controllers.js");

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

app.all("/*splat", handleUnmatchedPath);

app.use(handleBadQuery);
app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;
