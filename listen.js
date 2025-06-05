const app = require("./app");

app.listen(9090, (err) => {
    if (!err) {
        console.log("Server is listening on port 9090...");
    } else {
        console.log("Error starting listening on port 9090: " + err);
    }
});
