const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const CategoryController = require("./controllers/Category");
const ArticleController = require("./controllers/Article");
const Category = require("./models/Category");
const Article = require("./models/Article");


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

app.use('/', CategoryController);
app.use('/', ArticleController);

app.get('/', (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log("Server is Running!");
})