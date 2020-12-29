const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Article = require("../models/Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
    res.render("admin/article/index")
})

router.get("/admin/article/new", (req, res) => {
    Category
        .findAll()
        .then((categories) => {
            res.render("admin/article/new", { categories });
        })
});

router.post("/admin/article/save", (req, res) => {
    const { title, body, category } = req.body;

    Article
        .create({
            title,
            slug: slugify(title),
            body,
            categoryId: category
        })
        .then(() => {
            res.redirect("/admin/articles");
        })
        .catch((err) => {
            console.log(`An unexpected error has occurred: ${err}`);
        });
});

module.exports = router;