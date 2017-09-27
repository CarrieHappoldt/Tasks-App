const express = require('express');
const userService = require("../services/userService.js");
const router = express.Router()

router.get("/:username/profile", (req, res, next) => {
    userService.getUser(req.params.username)
        .then( user => res.render('profile', {user}) )
        .catch( error => res.render('profile', {error : error.message}));  
});

router.post("/:username/profile", (req, res, next) => {
    let currentUserName = req.params.username
    let newUsername = req.body.newUsername
    let newEmail = req.body.newEmail
    let currentEmail;
    
    userService.getUser(currentUserName)
        .then( (user) => { 
            currentEmail = user.email
            //if no changes
            if(currentUserName === newUsername && newEmail === currentEmail){
                res.redirect(`/${currentUserName}/profile`)
            } //if changes
            else { 
                userService.checkUsername(newUsername) //check that user name isn't taken
                .then( () => userService.edit(currentUserName, newUsername, newEmail) )
                .then( () => res.redirect(`/${newUsername}/profile`) )
                .catch( error => res.render('profile', {error : error.message}) )
            }
        })
        .catch( error => res.render('profile', {error : error.message}) )
});





module.exports = router;