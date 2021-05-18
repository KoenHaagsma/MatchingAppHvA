//TODO: Update to what i want.

const express = require("express");
const userModel = require("../models/user");
const router = express.Router();

// GET single user
router.get("/:id", function (req, res) {
    userModel.findById(req.params.id, function (err, user) {
        res.render("user", {
            user: user,
        });
    });
});

module.exports = router;
