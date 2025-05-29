const db = require("../connection");

// exports.dropTables = (...tables) => {
//     allTablesQuery = ``;
//     for (table of tables) allTablesQuery += `DROP TABLE IF EXISTS ${table};`;
//     return db.query(allTablesQuery);
// };

exports.dropTables = () => {
    const tables = ["comments", "articles", "users", "topics"];
    let dropTablesQuery = ``;
    for (table of tables) dropTablesQuery += `DROP TABLE IF EXISTS ${table};`;
    return db.query(dropTablesQuery);
};

exports.createTables = () => {
    const topicsTable = `Create TABLE topics (
    slug VARCHAR(40) PRIMARY KEY,
    description VARCHAR(200),
    img_url VARCHAR(1000)
    );`;

    const usersTable = `Create TABLE users (
    username VARCHAR(40) PRIMARY KEY,
    name VARCHAR(40),
    avatar_url VARCHAR(1000)
    );`;

    //articles table: topic ref slug, author ref user username
    const articlesTable = `Create TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    topic VARCHAR(40) REFERENCES topics(slug),
    author VARCHAR(40) REFERENCES users(username),
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000)
    );`;

    const commentsTable = `Create TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(article_id),
    body TEXT,
    votes INT DEFAULT 0,
    author VARCHAR(40) REFERENCES users(username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    return db.query(topicsTable + usersTable + articlesTable + commentsTable);
};
