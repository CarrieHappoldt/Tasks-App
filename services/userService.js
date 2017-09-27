const crypto = require('crypto');


const users = {
    chappoldt : {
        id : 1,
        username: 'chappoldt',
        email: 'carrie@happoldt.com',
        password:'bob',
        avatarUrl: 'https://www.gravatar.com/avatar/' + crypto.createHash('md5').update('carrie@happoldt.com').digest('hex')
    },
    jhappoldt : {
        id : 2,
        username: 'jhappoldt',
        email: 'josh@happoldt.com',
        password:'secret2',
        avatarUrl: 'https://www.gravatar.com/avatar/' + crypto.createHash('md5').update('josh@happoldt.com').digest('hex')
    }
}


// RETURNS AN OBJECT WITH THE user's OR user INFO
function getUser(username) {
    return new Promise( (resolve, reject) => {
        if(users[username]) {
            resolve(users[username]);
        } else {
            reject(Error(`No user ${username} found`))
        }
    });
}

//CHECKS TO SEE IF PASSWORDS ARE THE SAME
function validateUser(username, password){
   return getUser(username)
        .then( user => user.password === password ? user : Promise.reject(Error('Password Mismatch')))
}

//ADDS A NEW USER TO users OBJECT
function addUser(userInfo, username){
    users[username] = userInfo;
    }

//CHECK TO SEE username GIVEN IN REG IS AVAILABLE
function checkUsername(username){
    return new Promise( (resolve, reject) => {
       if(users[username]) {
            //console.log("User Name Was taken, rejected")
            reject(Error(`Username is already taken`));
        } else {
            //console.log("User Name is not taken, resolved")
            resolve();
        } 
    })
}

function getAvatarPic(avatarPicArray){
    let num = Math.floor(Math.random() * avatarPicArray.length)
    return avatarPicArray[num];
}

function edit(username, newUsername, newEmail){
   return getUser(username)
        .then( user => {
            user.email = newEmail
            user.username = newUsername
            return
        })
        
        .then( () => {
           if (username !== newUsername){
               users[newUsername] = users[username]
               delete users[username]
               console.log(users)
                return
            } 
        })
}

module.exports = {
    getUser,
    validateUser,
    addUser,
    checkUsername,
    getAvatarPic,
    edit
}