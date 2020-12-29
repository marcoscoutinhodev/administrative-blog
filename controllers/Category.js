const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const slugify = require("slugify");

router.get("/admin/category/new", (req, res) => {
    res.render("admin/category/new");
});

router.post("/admin/category/save", (req, res) => {
    const { title } = req.body;

    if(title) {
        Category
            .create({
                title,
                slug: slugify(title)
            })
            .then(() => {
                res.redirect('/');
            })
    } else {
        res.redirect("/admin/category/new");
    }
});

router.get("/admin/categories", (req, res) => {
    Category
        .findAll()
        .then((categories) => {
            res.render("admin/category/index", {
                categories
            })
        });
});

router.post("/admin/category/delete", (req, res) => {
    const { id } = req.body

    if(id) {
        Category
            .destroy({
                where: {
                    id
                }
            })
            .then(() => {
                res.redirect("/admin/categories");
            })
    } else {
        res.redirect("/admin/categories");
    }
});

module.exports = router;