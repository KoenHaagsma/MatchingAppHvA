// Requirements
const express = require("express");
const chalk = require("chalk");
const pug = require("pug");

//Using path, doesn't have to be imported to use.
const path = require("path");

// Init app
const app = express();
const port = 3001;

//Load view engine | Path: Directory name + map name.
app.set(
    "views",
    path.join(__dirname, "views")
);
app.set("view engine", "pug");

// Home Route
app.get("/", (req, res) => {
    res.render("index");
});

// Start Server
app.listen(port, () => {
    console.log(
        chalk.red(
            `Listening at http://localhost:${port}`
        )
    );
});
