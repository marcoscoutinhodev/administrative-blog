const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(express.static("public"));

connection
    .authenticate()
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(`An unexpected error has occurred: ${err}`);
    });

app.get('/', (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log("Server is Running!");
})