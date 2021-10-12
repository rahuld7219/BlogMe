const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String, // a URL for the photo
        default: "no_image_placeholder.png"
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array, // an array of categories to which the post can belong to, eg: a post can belong to ["music", "life"]
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);