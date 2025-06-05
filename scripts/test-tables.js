const db = require("../db/connection");

db.query(
    "o output-tables.txt SELECT * FROM users; SELECT * FROM topics; SELECT * FROM articles; SELECT * FROM comments"
);
