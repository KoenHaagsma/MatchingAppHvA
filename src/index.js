// Requirements
const express = require("express");
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
app.use("/assets", express.static(path.join(__dirname, "public")));

// Used validation from: https://github.com/elvc/node_express_pug_mongo/blob/master/app.js

// Session middleware
app.use(
    session({
        cookie: { maxAge: 3600000 },
        store: new MemoryStore({
            checkPeriod: 3600000,
        }),
        secret: "new_text",
        resave: true,
        saveUninitialized: true,
    })
);

// Messages middleware
app.use(require("connect-flash")());
app.use(function (req, res, next) {
    res.locals.messages = require("express-messages")(req, res);
    next();
});

// Validator middleware, had to degrade to older version of expressValidator because it said expressValidator is not a function
// https://stackoverflow.com/questions/56733975/express-validator-error-expressvalidator-is-not-a-function
// https://github.com/express-validator/express-validator/issues/735

// Temporary logged in user
let loggedInUser = {
    _id: "60a7b57940fa35578c6e7c1v",
    firstName: "Koen",
    lastName: "Haagsma",
    code: "const code = 'I love code!'",
    codeInterests: ["CSS", "RUBY"],
    matched: [],
    ignored: [],
};

// https://www.geeksforgeeks.org/how-to-find-if-two-arrays-contain-any-common-item-in-javascript/

// Routes
// Home Route
app.get("/", (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(404).render("404");
        } else {
            const filteredUsers = users.filter((user) => {
                if (
                    !(
                        loggedInUser.matched.includes(user._id.toString()) ||
                        loggedInUser.ignored.includes(user._id.toString())
                    )
                ) {
                    return user;
                }
            });
            let matchedUsers = [];
            for (const user of filteredUsers) {
                let count = 0;
                for (const interest of user.codeInterests) {
                    if (loggedInUser.codeInterests.includes(interest)) {
                        count++;
                    }
                    if (count >= 2) {
                        matchedUsers.push(user);
                        break;
                    }
                }
            }

            if (matchedUsers.length === 0) {
                res.render("index_empty", {
                    title: "Matches",
                    empty: "Oeps! Het lijkt erop dat je niet gematched bent aan een andere persoon.",
                });
            } else {
                res.render("index", {
                    title: "Matches",
                    users: matchedUsers,
                    aantalMatches: matchedUsers.length,
                });
            }
        }
    });
});

// Help: https://stackoverflow.com/questions/42075073/mongoose-how-to-update-an-user-info

// TODO: als user al in de database staat niet toevoegen even checken.

app.post("/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
            return;
        } else if (req.body.like === "true") {
            loggedInUser.matched.push(user.id);
            User.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { matched: loggedInUser._id },
                },
                { new: true },
                function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        res.redirect("/");
                    }
                }
            );
        } else if (req.body.dislike === "false") {
            loggedInUser.ignored.push(user.id);
            User.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { ignored: loggedInUser._id },
                },
                { new: true },
                function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        res.redirect("/");
                    }
                }
            );
        }
    });
});

// Help https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array

// My Matches route
app.get("/matches", (req, res) => {
    let matchedUsers = [];
    loggedInUser.matched.forEach((user) => {
        matchedUsers.push(user);
    });
    User.find(
        {
            _id: { $in: matchedUsers },
        },
        (err, users) => {
            if (err) {
                console.log(err);
                res.redirect("/");
            } else {
                if (matchedUsers.length === 0) {
                    res.render("my_matches_empty", {
                        title: "Mijn Matches",
                        empty: "Oeps! Het lijkt erop dat je nog geen matches hebt geaccepteerd.",
                    });
                } else {
                    res.render("my_matches", {
                        title: "Mijn Matches",
                        users: users,
                    });
                }
            }
        }
    );
});

// All routes that have something to do with users
app.use("/user", userRoutes);

// Handling 404
// TODO: Even kijken of ik use moet gebruiken of iets anders.
app.use((req, res, next) => {
    res.status(404).render("404");
    next();
});

// Start Server
app.listen(port, () => {
    console.log(chalk.blue(`Listening at http://localhost:${port}`));
});
