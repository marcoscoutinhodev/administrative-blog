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

module.exports = router;