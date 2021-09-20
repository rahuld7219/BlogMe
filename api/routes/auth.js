const router = require("express").Router();
const User = require("../models/User");
// const Token = require("../models/Token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
// const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

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
        res.status(200).json(user); // sending a json response instead of rendering page or sending text
    } catch (err) {
        res.status(500).json(err);
        /* can handle this error better, instead of always setting response code 500 for every error */
    }
});

const generateAccessToken = (userId) => {
    return jwt.sign(
        { userId }, // payload also contains iat (issued at) field by default
        accessTokenSecret,
        { expiresIn: "15m" } //60, "2 days", "10h", "7d". A numeric value is interpreted as seconds. If giving as string be sure to provide the time units, otherwise milliseconds unit is used by default ("120" is equal to "120ms").
    ); // default signing algo used is HS256
}

// const generateRefreshToken = (userId) => {
//     return jwt.sign(
//         { userId }, // payload also contains iat (issued at) field by default
//         refreshTokenSecret
//     ); // default signing algo used is HS256
// }


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

        // // generate an JWT refresh token
        // const refreshToken = generateRefreshToken(user._id);
        // await new Token({ refreshToken }).save();

        const { password, ...rest } = user._doc; //the data we store on database lies under _doc field, while findOne() returns the model itself which also has special properties that aren't part of the schema
        res.status(200).json({
            ...rest,  // we send all other data except the password
            accessToken
            // ,refreshToken
        });

    } catch (err) {
        res.status(500).json(err);
    }

});

// // CREATE NEW JWT ACCESS TOKEN and ALSO CREATE NEW JWT REFRESH TOKEN
// router.post("/refresh", async (req, res) => {
//     // take the refresh token from the user
//     const refreshToken = req.body.refreshToken;

//     // send error if there is no refresh token or it's invalid
//     if (!refreshToken) return res.status(401).send("You are not authenticated");
//     const token = await Token.findOne({ refreshToken });
//     if (!token) return res.status(403).send("Invalid Refresh Token");

//     jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => { // decoded is payload that is used while signing
//         err && console.log(err);

//         // if everything is ok, create new access token , also create new refresh token for better security and send them to the user
//         await Token.deleteOne({ refreshToken })// delete the current refresh token
//         const newAccessToken = generateAccessToken(decoded.userId); // decoded is payload that is used while signing
//         const newRefreshToken = generateRefreshToken(decoded.userId);
//         await new Token({ newRefreshToken }).save();// store new refresh token in database
//         res.status(200).json({
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken
//         });
//     });

// });

// router.post("/logout", async (req, res) => {

//     const refreshToken = req.body.refreshToken;

//     // delete refresh token for current user from the database
//     const data = await Token.deleteOne({ refreshToken });

//     res.status(200).json(
//         { accessToken: "" } // send empty access token to invalidate the access token for current user
//     );
// });

module.exports = router;