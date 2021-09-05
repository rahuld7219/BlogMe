const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json()); // to parse the incoming requests with JSON payloads

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl)
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute)

app.listen(8080, () => {
    console.log("Backend running at port 8080");
});