const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");


// UPDATE USER
router.put("/:id", async (req, res) => {
    // checking if updating own account
    if (req.body.userId === req.params.id) { // should used session or JWT instead of this condition
        try {
            // if user want to update the password also
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 12);
            }
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, // find by id
                { $set: req.body }, // update the found document with req.body data
                { new: true } // by default, findByIdAndUpdate returns old document before updating, to return new updated one we pass new parameter as true
            );
            const { password, ...rest } = updatedUser._doc;
            res.status(400).json(rest);

        } catch (err) {
            res.status(500).json(err);
        }

    } else {
        res.status(401).send("You can update only your acoount!") // lacks valid authentication
    }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
    // checking if deleting own account
    if(req.body.userId === req.params.id) { // should used session or JWT instead of this condition
        try {
            // if user exist
            const user = await User.findById(req.params.id);
            try {
                // deleting posts of the user to be deleted
                await Post.deleteMany({ username: user.username });
                // deleting the user
                await User.findByIdAndDelete(req.params.id);
                res.status(200).send("User has been deleted...")
            } catch(err) {
                res.status(500).json(err);
            }

        } catch(err) {
            res.status(404).send("User not found!");
        }
    } else {
        res.status(401).send("You can delete only your acoount!")
    }
});

// GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;