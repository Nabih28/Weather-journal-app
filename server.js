// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

//Setup an instance of app
const app = express();

//Dependencies 
const bodyparser = require('body-parser');

// configure express to use body-parser as middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//Initialize the main project folder 
//this code connects the server-side code with the client-side code
app.use(express.static('website'));


//Creating local server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log("Server is running");
    console.log(`Running on localhost: ${port}`);
}

//Establishing a GET ROUTE
app.get('/get', function (req, res) {
    res.send(projectData);
  })

//Establishing a POST ROUTE
app.post('/add', function (req, res) {
    projectData = req.body ;
    res.send(projectData) ;
    console.log(projectData);
  })