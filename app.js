const express = require("express");
//const db = require("./db/connection");
const endpoints = require("./endpoints.json");
const {
    getTopics,
    getArticles,
    getUsers,
    getArticle,
} = require("./controllers");

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
    res.status(200).send({ endpoints });
});

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/users", getUsers);
app.get("/api/articles/:article_id", getArticle);

// app.get("/api/articles/:article_id", (req, res) => {
//     article_id = req.params.article_id;
//     db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id]).then(
//         ({ rows }) => {
//             console.log(rows[0]);
//             res.status(200).send({ article: rows[0] });
//         }
//     );
// });

// app.use;

module.exports = app;
