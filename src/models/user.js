const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstName: String,
    lastName: String,
});

module.exports = mongoose.model(
    "User",
    userSchema
);
