// Requirements
const express = require("express");
const chalk = require("chalk");
const pug = require("pug");
// Not sure if i have to import this or if it's included within express.js
const serveStatic = require("serve-static");

// Using path, doesn't have to be imported to use | Makes life easier when using Path
const path = require("path");

// Init app
const app = express();
const port = 3002;

// Load view engine | Path: Directory name + map name.
app.set(
    "views",
    path.join(__dirname, "views")
);
app.set("view engine", "pug");

// Serving static files (CSS, IMG, JS.)
app.use(
    "/assets",
    express.static(
        path.join(__dirname, "public")
    )
);
// Assuming: http://localhost:port/assets

// Home Route
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

// Handling 404
app.use(function (req, res, next) {
    res.status(404).render("404");
});

// Start Server
app.listen(port, () => {
    console.log(
        chalk.red(
            `Listening at http://localhost:${port}`
        )
    );
});
