const express = require('express');
const taskService = require('../services/taskService.js');
const userService = require("../services/userService.js");

const router = express.Router();

//TASK LIST PAGES
router.get('/:username/tasks', (req, res, next) => {
    userService.getUser(req.params.username)
        .then( user => taskService.getAll(user.id)
        .then( tasks => res.render('taskList', {tasks, user}) ) )
        .catch( error => res.render('taskList', {error : error.message}));  
})

//ADDING A NEW TASK
router.post("/:username/tasks", (req, res, next) => {
     const username = req.params.username;
     const task = {
         name: req.body.taskName,
         complete: false,
         id: Math.floor(Math.random() * (10000 - 1)) + 1,
        }
     
     userService.getUser(username)
        .then( (user) => {
            return taskService.addTask(user.id, task)
                .then( (tasks) => res.render("taskList", {tasks , user}))
        })
        .catch( error => res.render('taskList', {error : error.message}));
     
 })

//DELETING A TASK
 router.post("/:username/tasks/delete", ( req, res, next) => {
    const username = req.params.username;
    const taskID = req.body.taskToDelete
    userService.getUser(username)
        .then( (user) => {
            return taskService.deleteTask(user.id, taskID)
        })
        .then( () => { 
            return res.redirect(`/${username}/tasks`) 
        })
        .catch( error => res.render('taskList', {error : error.message}));
})

//EDITING A TASK
 router.post("/:username/tasks/edit", (req, res, next) => {
    const username = req.params.username;
    const taskID = req.body.taskToEditID;
    const newTaskName = req.body.newTaskName;
    userService.getUser(username)
        .then( (user) => taskService.editTask(user.id, taskID, newTaskName) )
        .then( () => res.redirect(`/${username}/tasks`) )
        .catch( error => res.render('taskList', {error : error.message}));x
 })


module.exports = router;
