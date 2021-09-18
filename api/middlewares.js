const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;

// middleware to verify access token(jwt) to check for authorization
const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization; // to get authorization field value of header
    if (authHeader) {
        const accessToken = authHeader.split(" ")[1]; // as access token received in headers authorization field as `Bearer accessToken`
        jwt.verify(accessToken, accessTokenSecret, (err, decoded) => { // decoded is payload that is used while signing
            if (err) {
                return res.status(403).json("Invalid access token") // client does not have access rights
            }
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

module.exports = authorize;