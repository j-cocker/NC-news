const db = require("../connection");
const { createTables, dropTables } = require("./manage-tables");
const { formatTableInsert } = require("./utils");

const seed = async ({ topicData, userData, articleData, commentData }) => {
    await dropTables();
    await createTables();

    const topicKeys = ["slug", "description", "img_url"];
    const userKeys = ["username", "name", "avatar_url"];
    const articleKeys = [
        "title",
        "topic",
        "author",
        "body",
        "created_at",
        "votes",
        "article_img_url",
    ];
    const commentKeys = ["body", "votes", "author", "created_at"];

    const topicsInsert = formatTableInsert(topicData, topicKeys, "topics");
    const userInsert = formatTableInsert(userData, userKeys, "users");
    const articleInsert = formatTableInsert(
        articleData,
        articleKeys,
        "articles"
    );
    const commentInsert = formatTableInsert(
        commentData,
        commentKeys,
        "comments"
    );

    await db.query(topicsInsert);
    await db.query(userInsert);
    await db.query(articleInsert);
    await db.query(commentInsert);

    return;
};

module.exports = seed;
