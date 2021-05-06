const express = require("express");
const userModel = require("../models/User");
const router = express.Router();

// GET New user page
router.get("/add", (req, res) => {
    res.render("add_user", {
        title: "Add new user",
    });
});

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
    console.log(req.validationErrors());
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

module.exports = router;
