// Requirements
const express = require("express");
const pug = require("pug");
const chalk = require("chalk");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const expressValidator = require("express-validator");

// Loading in Mongoose connection
const connectDBMongoose = require("./config/mongoose");

// User model
const User = require("./models/user");

// Loading in Routes
const userRoutes = require("./routes/userRoutes");

// Init app
const app = express();
const port = process.env.PORT || 1337;

// Connecting to MongoDB
connectDBMongoose();

// Load view engine | Path: Directory name + map name.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Instead of Body-parser
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Serving static files (CSS, IMG, JS, etc.)
app.use(
    "/assets",
    express.static(path.join(__dirname, "public"))
);

// Used validation from: https://github.com/elvc/node_express_pug_mongo/blob/master/app.js

// Session middleware
app.use(
    session({
        cookie: { maxAge: 86400000 },
        store: new MemoryStore({
            checkPeriod: 86400000,
        }),
        secret: "new_text",
        resave: true,
        saveUninitialized: true,
    })
);

// Messages middleware
app.use(require("connect-flash")());
app.use(function (req, res, next) {
    res.locals.messages = require("express-messages")(
        req,
        res
    );
    next();
});

// Validator middleware, had to degrade to older version of expressValidator because it said expressValidator is not a function
// https://stackoverflow.com/questions/56733975/express-validator-error-expressvalidator-is-not-a-function
// https://github.com/express-validator/express-validator/issues/735

app.use(
    expressValidator({
        errorFormatter: function (param, msg, value) {
            var namespace = param.split("."),
                root = namespace.shift(),
                formParam = root;

            while (namespace.length) {
                formParam += "[" + namespace.shift() + "]";
            }
            return {
                param: formParam,
                msg: msg,
                value: value,
            };
        },
    })
);

// User.insertMany([
//     {
//         firstName: "Testing",
//         lastName: "Goovert",
//         code: "const code = 'I love code!'",
//         codeInterests: ["PHP"],
//     },
// ])
//     .then(function () {
//         console.log("Data inserted"); // Success
//     })
//     .catch(function (error) {
//         console.log(error); // Failure
//     });

let loggedInUser = {
    firstName: "Koen",
    lastName: "Haagsma",
    code: "const code = 'I love code!'",
    codeInterests: ["HTML", "CSS", "JS", "PHP", "VUE"],
};

// https://www.geeksforgeeks.org/how-to-find-if-two-arrays-contain-any-common-item-in-javascript/

// Routes
// Home Route
app.get("/", (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(404).render("404");
        } else {
            let matchedUsers = [];
            function findCommonElements(arr2, arr1) {
                return arr1.some((item) =>
                    arr2.includes(item)
                );
            }
            users.forEach((user) => {
                if (
                    findCommonElements(
                        loggedInUser.codeInterests,
                        user.codeInterests
                    )
                ) {
                    matchedUsers.push(user);
                } else if (
                    !findCommonElements(
                        loggedInUser.codeInterests,
                        user.codeInterests
                    )
                ) {
                    return;
                }
            });
            res.render("index", {
                title: "Users",
                users: matchedUsers,
            });
        }
    });
});

// All routes that have something to do with users
app.use("/users", userRoutes);

// Handling 404
app.use((req, res, next) => {
    res.status(404).render("404");
    next();
});

// Start Server
app.listen(port, () => {
    console.log(
        chalk.blue(`Listening at http://localhost:${port}`)
    );
});
