const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
//const {getRecordPage} = require('./routes/record');
const {addPatientPage, addPatient, editPatient, editPatientPage, deletePatient, patientRecPage} = require('./routes/patient');
const {allergiesPage} = require('./routes/allergies');
//const {} = require('./routes/record');
const port = 5000;

// create connection to database
const con = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emr_db'
});

// connect database
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
global.con = con;


app.set('port', process.env.port || port); 
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(fileUpload()); 


app.get('/', getHomePage);
//app.get('/record', getRecordPage);
app.get('/add', addPatientPage);
app.get('/edit/:id', editPatientPage);
app.get('/delete/:id', deletePatient);
app.get('/record/:id', patientRecPage);
app.get('/allergies/:id', allergiesPage);
app.post('/add', addPatient);
app.post('/edit/:id', editPatient);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});