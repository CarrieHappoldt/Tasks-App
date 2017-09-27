const express = require('express');
const userService = require("../services/userService.js");

const router = express.Router();

//LOGIN PAGE
router.get("/login", (req, res, next) => {
    res.render("login");
});

router.post("/login", (req, res, next) => {
    userService.validateUser(req.body.username, req.body.password)
        .then( () => res.redirect(`/${req.body.username}/tasks`) )
        .catch( error => res.render('login', {username : req.body.username , error : error.message}) );
});

module.exports = router;