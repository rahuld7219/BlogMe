const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer") // for image uploads
const path = require("path");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json()); // to parse the incoming requests with JSON payloads

// specify images folder, whenever request comes for path /images
app.use("/images", express.static(path.join(__dirname, "/images")));

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl)
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// defining multer storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images"); // specify the destination path as /images
    },
    filename: (req, file, callback) => {
        callback(null, req.body.filename); // specifies the name of the uploaded file
    }
});

const upload = multer({ storage }); // setting the multer storage

//route to upload file
app.post(
    "/api/upload",
    upload.single("file"), // upload a single file with key "file"
    (req, res) => {
        res.status(200).send("File has been uploaded!");
    }
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// specifying our client side as static files (to deploy on heroku for free by moving client side inside backend(node) folder)
// hroku automatically create build folder
app.use(express.static(path.join(__dirname, "/client/build")));

// to specify that any request to our site goes through the client folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Backend running at port", port);
});