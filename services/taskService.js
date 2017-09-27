

const userTasks = {
    1 : [
            { name : 'Learn HTML', complete: true, id: 1 },
            { name : 'Learn CSS', complete: true , id: 2},
            { name : 'Learn JS', complete: true, id: 3 },
            { name : 'Learn Express', complete: false, id: 4 },
            { name : 'Learn React', complete: false, id: 5 }
        ],
    2: [
            { name : 'Run a 5k', complete: false, id: 1 },
            { name : 'Win everything', complete: false, id: 2 }
        ]
}

// WITH userId RETURNS AN ARRAY of OBJECTS or tasks, EACH IS A task
function getAll(userId) {
    return new Promise((resolve, reject) => {
        if (userTasks[userId]) {
            resolve(userTasks[userId]);
        } else {
            reject(Error(`No tasks found for ${userId}`))
        }
    })
}


/**
 * 
 * Adds a task (needs to contain name and complete and id) to the users task list.
 */
 //ADDS A TASK THEN GETS THE TASKLIST WTIH getAll()
function addTask(userId, task) {
    return new Promise((resolve, reject) => {
        if(userTasks[userId]) {
            //  Add the task
            userTasks[userId].push(task)
            // Get teh updated task list
            resolve();
        } else {
            reject(Error(`No such user ${userId}`))
        }
    })
        .then( () => getAll(userId) )
}
/**
 * 
 * deletes a task (needs id) from the users task list.
 */
 //deletes A TASK THEN GETS THE TASKLIST WTIH getAll()
function deleteTask(userId, taskID){
    return new Promise((resolve, reject) => {
        //if there is a user with the mathcing id
        if(userTasks[userId]){
            let tasks = userTasks[userId];
            let taskIndex;
            let numTaskID = Number(taskID);
          //find the task that matches the taskID
             tasks.forEach(function( task, index) {
                 if(task.id === numTaskID){
                     taskIndex = index
                 } 
             })
             tasks.splice( taskIndex , 1);  
          //get the updated task list
          resolve();
        } else {
            reject(Error(`Could not remove task`))
        }
    })
}

/**
 * 
 * edits a task (needs task's id, userId and new tasks name) from the users task list.
 */
 //EDITS A TASK THEN GETS THE TASKLIST WTIH getAll()
 function editTask(userId, taskID, newTaskName){
    return new Promise((resolve, reject) => {
        if(newTaskName != ""){ 
            if(userTasks[userId]){
                let tasks = userTasks[userId];
                let taskIndex;
                let numTaskID = Number(taskID);
              //find the task that matches the taskID
                 tasks.forEach(function(task, index) {
                     if(numTaskID === task.id){
                         taskIndex = index
                     } 
                 }) 
                 //update with old name with new name
                 tasks[taskIndex].name = newTaskName;
                 tasks[taskIndex].complete = false;
              resolve();
            } 
        } else {
            reject(Error("Can not change task to be blank"))
        }    
    })
 }
 
 //Adding a new User to tasklist
 function addUserToTasks(userId){
     return new Promise( (resolve, reject) => {
         userTasks[userId] = [];
         const task = {
                     name: "Add new task",
                     complete: false,
                     id: Math.floor(Math.random() * (10000 - 1)) + 1,
                    }
        userTasks[userId].push(task)
        resolve();
     })
 }
 
 
module.exports = {
    getAll,
    addTask,
    deleteTask,
    editTask,
    addUserToTasks
}