const express = require('express');
const taskService = require('../services/taskService.js');
const userService = require("../services/userService.js");

const router = express.Router();

const avatarPicArray = [ "pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg", "pic6.jpg" ];

//Registration PAGE
router.get("/registration", (req, res, next) => {
    res.render("registration");
});

router.post("/registration", (req, res, next) => {
    if(req.body.password === req.body.passwordComformation ) {
        
            let username = req.body.username;
            let assignedAvatar = userService.getAvatarPic(avatarPicArray);
            let user = {
                    "username" : username,
                    email : req.body.email,
                    id: Math.floor(Math.random() * (10000 - 1)) + 1,
                    password: req.body.password,
                    avatarUrl: `/avatarPics/${assignedAvatar}`
                };
                
        userService.checkUsername(req.body.username)
            .then( () => userService.addUser(user , username) )
            .then( () => taskService.addUserToTasks(user.id) )
            .then( () => res.redirect("/login") )
            .catch( error => res.render('registration', {username : req.body.username ,error : error.message, email : req.body.email }));  
    }      
});

module.exports = router;