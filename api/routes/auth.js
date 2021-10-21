const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;

//REGISTER
router.post("/register", async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

const generateAccessToken = (userId) => {
    return jwt.sign(
        { userId }, // payload also contains iat (issued at) field by default
        accessTokenSecret,
        { expiresIn: "15m" } //60, "2 days", "10h", "7d". A numeric value is interpreted as seconds. If giving as string be sure to provide the time units, otherwise milliseconds unit is used by default ("120" is equal to "120ms").
    ); // default signing algo used is HS256
}

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send("Wrong Credentials!");
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            return res.status(400).send("Wrong Credentials!");
        }

        // generate an JWT access token
        const accessToken = generateAccessToken(user._id);

        const { password, ...rest } = user._doc; //the data we store on database lies under _doc field, while findOne() returns the model itself which also has special properties that aren't part of the schema
        res.status(200).json({
            ...rest,  // we send all other data except the password
            accessToken
        });

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;