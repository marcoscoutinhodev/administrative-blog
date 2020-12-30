const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Article = require("../models/Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
    Article
        .findAll({
            include: [ { model: Category } ]
        })
        .then((articles) => {
            res.render("admin/article/index", { articles });
        })
        .catch((err) => {
            console.log(`An unexpected error has occurred: ${err}`);
        });
});

router.get("/admin/article/new", (req, res) => {
    Category
        .findAll()
        .then((categories) => {
            res.render("admin/article/new", { categories });
        })
        .catch((err) => {
            console.log(`An unexpected error has occured: ${err}`);
        });
});

router.post("/admin/article/save", (req, res) => {
    const { title, body, category } = req.body;

    if(title && body && category > 0) {
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
    } else {
        res.redirect("/admin/articles");
    }
});

router.post("/admin/article/delete", (req, res) => {
    const { id } = req.body;

    if(id) {
        Article
            .destroy({
                where: {
                    id
                }
            })
            .then(() => {
                res.redirect("/admin/articles");
            })
            .catch((err) => {
                console.log(`An unexpected error has occurred: ${err}`);
            });
    } else {
        res.redirect("/admin/articles");
    }
});

router.get("/admin/article/edit/:id", (req, res) => {
    const { id } = req.params;

    if(!isNaN(id)) {
        Article
            .findByPk(id, { include: [{ model: Category }] })
            .then((article) => {
                if(article) {
                    res.render("admin/article/edit", { article });
                } else {
                    res.redirect("/admin/articles");
                }
            })
            .catch((err) => {
                console.log(`An unexpected error has occurred: ${err}`);
            })
    } else {
        res.redirect("/admin/articles");
    }
});

router.post("/admin/article/update", (req, res) => {
    const { id, title, body } = req.body;

    Article
        .update({ title, slug: slugify(title), body }, {
            where: {
                id
            }
        })
    .then(() => {
        res.redirect("/admin/articles");
    })
    .catch((err) => {
        console.log(`An unexpected error has occurred: ${err}`);
    });
});

module.exports = router;