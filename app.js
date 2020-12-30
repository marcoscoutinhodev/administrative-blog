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
    Article
        .findAll({
            include: [{ model: Category }],
            order: [ ["id", "desc"] ]
        })
        .then((articles) => {
            res.render("index", { articles });
        });
});

app.get("/:slug", (req, res) => {
    const { slug } = req.params;

    Article
        .findOne({
            where: {
                slug
            }
        })
        .then((article) => {
            if(article) {
                res.render("article", { article });
            } else {
                res.redirect('/');
            }
        })
        .catch((err) => {
            console.log(`An unexpected error has occurred: ${err}`);
        });
});

app.listen(PORT, () => {
    console.log("Server is Running!");
})