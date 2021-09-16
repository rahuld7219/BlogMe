const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            profilePic: "defaultPic.png"
        });
        const user = await newUser.save();
        res.status(200).json(user); // sending a json response instead of rendering page or sending text
    } catch (err) {
        res.status(500).json(err);
        /* can handle this error better, instead of always setting response code 500 for every error */
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user) {
            return res.status(400).send("Wrong Credentials!");
        }
        
        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated) {
            return res.status(400).send("Wrong Credentials!");
        }

        const { password, ...rest } = user._doc; //the data we store on database lies under _doc field, while findOne() returns the model itself which also has special properties that aren't part of the schema
        res.status(200).json(rest); // we send all other data except the password

    } catch(err) {
        res.status(500).json(err);
    }

});
module.exports = router;