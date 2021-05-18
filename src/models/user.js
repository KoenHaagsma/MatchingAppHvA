const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        code: String,
        codeInterests: [String],
        matched: [String],
        ignored: [String],
    },
    { timestamps: true, typeKey: "$type" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
