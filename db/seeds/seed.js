const db = require("../connection");
const format = require("pg-format");
const { emojiArticleReactData } = require("../data/test-data");
const { createTables, dropTables } = require("./manage-tables");
const { formatTableInsert } = require("./utils");

const seed = async ({
    topicData,
    userData,
    articleData,
    commentData,
    emojiData,
    followData,
    emojiArticleReactData,
    userArticleVoteData,
    userTopicData,
}) => {
    await dropTables();
    await createTables();

    const tablesNames = await db.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    );
    // const tablesInfo = tablesNames.rows.map((tableObj) => {
    //     tableObj.keys = db.query(
    //         "SELECT column_name FROM information_schema.columns WHERE table_name = $1;",
    //         [tableObj.table_name]
    //     );
    // });

    //Keys
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
    const commentKeys = ["article_id", "body", "votes", "author", "created_at"];
    const emojiKeys = ["emoji"];
    const followKeys = ["username", "follow"];
    const emojiArticleReactKeys = ["emoji_id", "username", "article_id"];
    const userArticleVoteKeys = ["username", "article_id", "vote_count"];
    const userTopicKeys = ["username", "topic"];

    //Query Inserts
    const topicsInsert = formatTableInsert(topicData, topicKeys, "topics");
    await db.query(topicsInsert);

    const userInsert = formatTableInsert(userData, userKeys, "users");
    await db.query(userInsert);

    const articleInsert = formatTableInsert(
        articleData,
        articleKeys,
        "articles"
    );
    await db.query(articleInsert);

    //CommentData (needs refactor due to unusual seed)
    const articlesTitleID = await db.query(
        `SELECT article_id, title FROM articles`
    );
    const titleIdLookup = {};
    articlesTitleID.rows.forEach((articleEntry) => {
        titleIdLookup[articleEntry.title] = articleEntry.article_id;
    });
    const updateCommentData = commentData.map((commentEntry) => {
        commentEntry.article_id = titleIdLookup[commentEntry.article_title];
        return commentEntry;
    });
    const commentInsert = formatTableInsert(
        updateCommentData,
        commentKeys,
        "comments"
    );
    await db.query(commentInsert);

    const emojiInsert = formatTableInsert(emojiData, emojiKeys, "emojis");
    const followInsert = formatTableInsert(
        followData,
        followKeys,
        "user_follows"
    );
    const emojiArticleReactInsert = formatTableInsert(
        emojiArticleReactData,
        emojiArticleReactKeys,
        "emoji_article_user"
    );

    const userArticleVoteInsert = formatTableInsert(
        userArticleVoteData,
        userArticleVoteKeys,
        "user_article_votes"
    );
    const userTopicInsert = formatTableInsert(
        userTopicData,
        userTopicKeys,
        "user_topics"
    );

    // await db.query(emojiInsert);
    // await db.query(followInsert);
    // await db.query(emojiArticleReactInsert);
    // await db.query(userArticleVoteInsert);
    // await db.query(userTopicInsert);

    return;
};

module.exports = seed;
