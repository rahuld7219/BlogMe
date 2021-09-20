const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        rquired: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String, // will be a photo url
        default: "defaultPic.png" // default photo url
    },
    about: {
        type: String,
        default: "Write Something About Yourself"
    }
}, { timestamps: true }); // passed timestamps option to assign createdAt and updatedAt fields

module.exports = mongoose.model("User", UserSchema);