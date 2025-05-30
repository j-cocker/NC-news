const db = require("../connection");

// exports.dropTables = (...tables) => {
//     allTablesQuery = ``;
//     for (table of tables) allTablesQuery += `DROP TABLE IF EXISTS ${table};`;
//     return db.query(allTablesQuery);
// };

exports.dropTables = () => {
    const tables = [
        "user_article_votes",
        "user_topics",
        "emoji_article_user",
        "emojis",
        "user_follows",
        "comments",
        "articles",
        "users",
        "topics",
    ];
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
    avatar_url VARCHAR(1000),
    UNIQUE (username)
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

    const userFollowing = `Create TABLE user_follows (
        user_follow_id SERIAL PRIMARY KEY,
        username VARCHAR(40) REFERENCES users(username),
        follow VARCHAR(40) REFERENCES users(username),
        UNIQUE(username, follow)
    );`;

    const emojisTable = `Create TABLE emojis (
        emoji_id SERIAL PRIMARY KEY,
        emoji VARCHAR(40) NOT NULL
    );`;

    const emojiArticleReact = `Create TABLE emoji_article_user (
        emoji_article_user_id SERIAL PRIMARY KEY,
        emoji_id INT REFERENCES emojis(emoji_id),
        username VARCHAR(40) REFERENCES users(username),
        article_id INT REFERENCES articles(article_id),
        UNIQUE(username, article_id)
    );`;

    const userTopic = `Create TABLE user_topics (
        user_topic_id SERIAL PRIMARY KEY,
        username VARCHAR(40) REFERENCES users(username),
        topic VARCHAR(40) REFERENCES topics(slug),
        UNIQUE(username, topic)
    );`;

    const userVotes = `Create TABLE user_article_votes (
        user_articles_vote_id SERIAL PRIMARY KEY,
        username VARCHAR(40) REFERENCES users(username),
        article_id INT REFERENCES articles(article_id),
        vote_count INT DEFAULT 0 NOT NULL,
        UNIQUE(username, article_id),
        CONSTRAINT vote_range CHECK(vote_count<=1 AND vote_count>=-1)
    );`;

    return db.query(
        topicsTable +
            usersTable +
            articlesTable +
            commentsTable +
            userFollowing +
            emojisTable +
            emojiArticleReact +
            userTopic +
            userVotes
    );
};

//emojisTable +
//emojiArticleReact +
//userTopic
