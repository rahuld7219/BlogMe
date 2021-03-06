const router = require("express").Router();
const Post = require("../models/Post");
const Category = require("../models/Category");
const authorize = require("../middlewares");

// CREATE POST
router.post("/", authorize, async (req, res) => {
    const newPost = new Post(req.body);
    const categories = newPost.categories;
    try {
        categories.forEach(async (category) => {
            const categoryFound = await Category.findOne({ name: category });
            if (!categoryFound) {
                await new Category({name: category}).save();
            }
        });
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE POST
router.put("/:id", authorize, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (req.body.username === post.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate( // you can use updateOne() instead as post has already been found above
                    req.params.id, // find by this id
                    { $set: req.body }, // update the data (merge, not overwrite)
                    { new: true } // return updated document
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).send("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE POST
router.delete("/:id", authorize, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (req.body.username === post.username) {
            try {
                await post.delete(); // we can use findByIdAndDelete() instead
                res.status(200).send("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).send("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL POSTS OR POSTS OF A PARTICULAR CATEGORY OR USER
router.get("/", async (req, res) => {
    const username = req.query.user; // if URl is like /?user=john
    const categoryName = req.query.category; // if URl is like /?category=music

    try {
        let posts;
        if (username) {
            posts = await Post.find({ username }); // to fetch posts of a particular user
        } else if (categoryName) {
            posts = await Post.find({ // to fetch posts of a particular category
                categories: { $in: [categoryName] } // posts where categories field array include categoryName
            });
        } else {
            posts = await Post.find(); // to fetch all posts
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;