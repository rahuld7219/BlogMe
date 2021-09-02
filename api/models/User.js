const mongoose = require("mongoose");

const UserSchema = new Schema({
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
        default: "" // default photo url
    }
}, { timestamps: true }); // passed timestamps option to assign createdAt and updatedAt fields

module.exports = mongoose.model("User", UserSchema);