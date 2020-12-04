const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const seedDB = require("./seed");

const app = express();

// database connection
mongoose.connect("mongodb://localhost/upstreet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected succefully...')
})

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/upstreet", express.static(__dirname + "/uploads"));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to upstreet application." });
});
require("./app/routes/purchase.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});