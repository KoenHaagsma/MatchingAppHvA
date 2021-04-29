const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDBMongoose = async () => {
    try {
        await mongoose.connect(
            process.env.DATABASE,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            }
        );
        console.log(
            chalk.greenBright(
                "Connection with the database established"
            )
        );
    } catch (error) {
        console.log(
            chalk.redBright(
                `an error occurred: ${error}`
            )
        );
        throw error;
    }
};

module.exports = connectDBMongoose;
