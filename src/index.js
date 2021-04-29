// Requirements
// const slug = require("slug");
// const multer = require("multer");
const express = require("express");
const pug = require("pug");
const chalk = require("chalk");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const connectDBMongoose = require("./config/mongoose");
const index = require("./routes/index");
const form = require("./routes/form");

// Init app
const app = express();
const port = process.env.PORT;

// Connecting to MongoDB
connectDBMongoose();

// Load view engine | Path: Directory name + map name.
app.set(
    "views",
    path.join(__dirname, "views")
);
app.set("view engine", "pug");

// Instead of Body-parser
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.post("/user", add);

// tryouts ----------------------
function add(req, res) {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };

    console.log(data);
    res.render("user", data);
}
//-------------------------------

// Serving static files (CSS, IMG, JS, etc.)
app.use(
    "/assets",
    express.static(
        path.join(__dirname, "public")
    )
);

// Routes
// Home Route
app.use("/", index);
app.use("/form", form);

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
