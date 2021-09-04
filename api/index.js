const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
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

app.listen(8080, () => {
    console.log("Backend running at port 8080");
});