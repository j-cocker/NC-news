// const userFollowing = `Create TABLE user_follows (
//         user_follow_id SERIAL PRIMARY KEY,
//         username VARCHAR(40) REFERENCES users(username),
//         follow VARCHAR(40) REFERENCES users(username)
//     );`;

module.exports = [
    {
        username: "icellusedkars",
        follow: "rogersop",
    },
    {
        username: "icellusedkars",
        follow: "lurker",
    },
    {
        username: "lurker",
        follow: "rogersop",
    },
];
