const express = require("express");
const db = require("./db/connection");
const endpoints = require("./endpoints.json");

const app = express();

//app.use(express.json());

app.get("/api", (req, res) => {
    res.status(200).send({ endpoints });
});

app.get("/api/topics", (req, res) => {
    db.query(`SELECT * FROM topics`).then(({ rows }) => {
        res.status(200).send({ topics: rows });
    });
});

app.get("/api/articles", (req, res) => {
    db.query(
        `SELECT articles.article_id, title, articles.author, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id)::INT AS comment_count FROM articles LEFT JOIN comments USING (article_id) GROUP BY articles.article_id ORDER BY articles.created_at DESC`
    ).then(({ rows }) => {
        res.status(200).send({ articles: rows });
    });
});

app.get("/api/users", (req, res) => {
    db.query(`SELECT * FROM users`).then(({ rows }) => {
        res.status(200).send({ users: rows });
    });
});

module.exports = app;
