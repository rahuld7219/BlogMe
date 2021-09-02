const mongoose = require("mongoose");

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String // a URL for the photo
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array // an array of categories to which the post can belong to, eg: a post can belong to ["music", "life"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);