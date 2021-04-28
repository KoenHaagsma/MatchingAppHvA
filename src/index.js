// Requirements
const express = require("express");
const pug = require("pug");
const chalk = require("chalk");
require("dotenv").config();
const slug = require("slug");
const path = require("path");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Init app
const app = express();
const port = process.env.PORT;

// Connecting to MongoDB
const uri = process.env.DATABASE;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on(
    "error",
    console.error.bind(
        console,
        chalk.red("connection error:")
    )
);

db.once("open", function () {
    console.log(
        chalk.yellow(
            "Database connection established"
        )
    );
});

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

app.post("/article", add);

let data;

// tryouts
function add(req, res) {
    let id = slug(req.body.title);

    data = {
        id: id,
        title: req.body.title,
        plot: req.body.plot,
        description:
            req.body.description,
    };

    console.log(data);
    res.render("article", data);
}

// Serving static files (CSS, IMG, JS, etc.)
app.use(
    "/assets",
    express.static(
        path.join(__dirname, "public")
    )
);

// Routes
// Home Route
app.get("/", (req, res) => {
    res.render("index");
});

// Login Route
app.get("/login", (req, res) => {
    res.render("login");
});

// Test Form Route
app.get("/form", (req, res) => {
    res.render("form");
});

// Handling 404
app.use(function (req, res, next) {
    res.status(404).render("404");
    next();
});

// Start Server
app.listen(port, () => {
    console.log(
        chalk.blue(
            `Listening at http://localhost:${port}`
        )
    );
});
