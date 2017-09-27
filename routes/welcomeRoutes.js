const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.redirect("/welcome");
});

router.get("/welcome", (req, res, next) => {
    res.render("welcome");
});

module.exports = router;