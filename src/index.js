// Requirements
const express = require("express");
const router = express.Router();
const pug = require("pug");
const chalk = require("chalk");
const multer = require("multer");
const upload = multer();
const dotenv = require("dotenv");

// Using path, doesn't have to be imported to use | Makes life easier when using Path
const path = require("path");

// Init app
const app = express();
const port = 1337;

// Load view engine | Path: Directory name + map name.
app.set(
    "views",
    path.join(__dirname, "views")
);
app.set("view engine", "pug");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.post(
    "/",
    function (req, res, next) {
        console.log(req.body);
        res.send(
            "Recieved your request"
        );
    }
);

// Serving static files (CSS, IMG, JS, etc.)
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

app.get("/form", (req, res) => {
    res.render("form");
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
