const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Method to check password used when loggin in
UserSchema.methods.validPassword = function (password) {
    // Using bcrypt to compare hashed password in DB with password entered by user
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("User", UserSchema);

module.exports = User;