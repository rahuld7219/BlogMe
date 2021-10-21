const router = require("express").Router();
const Category = require("../models/Category");
const authorize = require("../middlewares");

// GET ALL CATEGORY
router.get("/", async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;