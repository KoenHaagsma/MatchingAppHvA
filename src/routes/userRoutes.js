//TODO: Update to what i want.

const express = require("express");
const userModel = require("../models/user");
const router = express.Router();

// GET New user page
router.get("/add", (req, res) => {
    res.render("add_user", {
        title: "Add new user",
    });
});

// Validation from: https://github.com/elvc/node_express_pug_mongo
// POST User to database
router.post("/add", (req, res) => {
    req.checkBody(
        "firstName",
        "Your first name is required to progress"
    ).notEmpty();
    req.checkBody(
        "lastName",
        "Your last name is required to progress"
    ).notEmpty();

    // Get the errors
    let errors = req.validationErrors();

    if (errors) {
        res.render("add_user", {
            title: "Add new user",
            errors: errors,
        });
    } else {
        let user = new userModel();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;

        user.save((err) => {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash(
                    "success",
                    "User added to database"
                );
                res.redirect("/");
            }
        });
    }
});

// Load edit form
router.get("/edit/:id", function (req, res) {
    userModel.findById(req.params.id, function (err, user) {
        res.render("edit_user", {
            title: "Edit User",
            user: user,
        });
    });
});

// Update user
router.post("/edit/:id", (req, res) => {
    let user = {};

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    let query = { _id: req.params.id };
    console.log(query);

    userModel.updateOne(query, user, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash("success", "User is updated!");
            res.redirect("/");
        }
    });
});

// TODO: Has to work yet
// Delete user
router.delete("/:id", function (req, res) {
    let query = { _id: req.params.id };
    console.log(query);

    userModel.deleteOne(query, (err) => {
        if (err) {
            console.error(err);
            return;
        } else {
            req.flash("success", "User Deleted");
            res.redirect("/");
        }
    });
});

// GET single user
router.get("/:id", function (req, res) {
    userModel.findById(req.params.id, function (err, user) {
        res.render("user", {
            user: user,
        });
    });
});

module.exports = router;
