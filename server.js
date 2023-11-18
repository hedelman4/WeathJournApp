/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

const port = 3000;

// Spin up server
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};

app.get('/all', function (req, res) {
    console.log(projectData);
});

const data = []

app.post('/add', addData);

function addData(req,res) {
    let data = req.body;
    projectData['temperature'] = data.temperature;
    projectData['date'] = data.date;
    projectData['content'] = data.content;
};
