const app = require("./app");
const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is listening on ${PORT}...`);
    } else {
        console.log(`Error starting listening on port ${PORT}: ${err}`);
    }
});
