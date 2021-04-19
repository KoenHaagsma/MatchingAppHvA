const express = require("express");
const chalk = require("chalk");
const app = express();
const port = 3001;

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        chalk.red(
            `Listening at http://localhost:${port}`
        )
    );
});
