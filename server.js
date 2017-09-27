// Imports
const express = require('express');
const routes = require('./routes/tasks')
const registrationRoutes = require('./routes/registrationRoutes')
const loginRoutes = require('./routes/loginRoutes')
const welcomeRoutes = require('./routes/welcomeRoutes')
const profileRoutes = require('./routes/profileRoutes')
const bodyParser = require('body-parser')

// Global File Variables
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//SETTING UP VIEW ENGINE: PUG
app.set('view engine', 'pug')

//STATIC FILES 
app.use(express.static('public'))

//ROUTES
app.use("/", routes);
app.use("/", registrationRoutes);
app.use("/", loginRoutes);
app.use("/", welcomeRoutes);
app.use("/", profileRoutes);

// ERROR HANDLER
app.use((req, res, next) => {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//SERVER
var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('Express Server is listening on port', port);
});
