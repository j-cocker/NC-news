const db = require("../db/connection");

async function queries() {
    const users = await db.query("SELECT * FROM users;");

    const codingArticles = await db.query(
        "SELECT * FROM articles WHERE topic = 'coding';"
    );

    const dodgyComments = await db.query(
        "SELECT * FROM comments WHERE votes <= 0;"
    );

    const topics = await db.query("SELECT * FROM topics;");

    const grumpyArticles = await db.query(
        "SELECT * FROM articles WHERE author = 'grumpy19';"
    );

    const amazingComments = await db.query(
        "SELECT * FROM comments WHERE votes >= 10;"
    );

    db.end();

    //console.log(users.rows);
    //console.log(codingArticles.rows);
    //console.log(dodgyComments.rows);
    //console.log(topics.rows);
    //console.log(grumpyArticles.rows);
    console.log(amazingComments.rows);
}

queries();
