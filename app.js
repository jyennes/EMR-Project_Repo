// Declare dependencies
const flash = require('express-flash');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const passport = require('passport');
const session = require('express-session');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');


// Declare route methods
const {getHomePage} = require('./routes/index');
const {addPatientPage, addPatient, editPatient, editPatientPage, deletePatient, patientRecPage} = require('./routes/patient');
const {allergiesPage, addAllergyPage, addAllergy, editAllergyPage, editAllergy, deleteAllergy} = require('./routes/allergies');
const {doctorsPage, addDoctorPage, addDoctor, editDoctorPage, editDoctor, deleteDoctor} = require('./routes/doctors');
const {nursesPage, addNursePage, addNurse, editNursePage, editNurse, deleteNurse} = require('./routes/nurses');
const {insurancePage, addInsurancePage, addInsurance, editInsurancePage, editInsurance, deleteInsurance} = require('./routes/insurance');
const {medicationsPage, addMedicationPage, addMedication, editMedicationPage, editMedication, deleteMedication} = require('./routes/medications');
const {adminPage, role, rolePage} = require('./routes/admin');
const {nurseAssign, nurseAssignPage, nurseAdminPage} = require('./routes/nurseAdmin');

// login
const {loginPage, registerPage, registerUser, userAuth, logout, codePage, twoFactorPage, twoFactor} = require('./routes/login');

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

// middleware setup
app.use(flash());
app.set('port', process.env.port || port); 
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(fileUpload()); 
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Makes user available on all ejs files (not used yet)
// app.use(function(req, res, next) {
//   res.locals.id = req.user.id;
//   next();
// });

app.use(function(req,res,next){
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});

// Routes
app.get('/',checkAuthenticated, getHomePage);
app.get('/add', addPatientPage);
app.get('/edit/:id', editPatientPage);
app.get('/delete/:id', deletePatient);
app.get('/record/:id', patientRecPage);
app.post('/add', addPatient);
app.post('/edit/:id', editPatient);

// Admin Routes
app.get('/admin',adminPage);
app.get('/role/:id',rolePage);
app.get('/nurseAdmin', nurseAdminPage);
app.get('/nurseAssign/:id', nurseAssignPage)
app.post('/role/:id', role);
app.post('/nurseAssign/:id', nurseAssign)

// Login Routes
app.get('/login', loginPage);
app.get('/register', registerPage);
app.get('/code', codePage);
app.get('/logout', logout);
// app.get('/2fa', twoFactorPage)
app.post('/login', userAuth);
app.post('/register', registerUser);
// app.post('/2fa', twoFactor);

// Allergy Routes
app.get('/allergies/:id', allergiesPage);
app.get('/addAllergy', addAllergyPage);
app.get('/editAllergy/:id', editAllergyPage);
app.get('/deleteAllergy/:id', deleteAllergy);
app.post('/addAllergy', addAllergy);
app.post('/editAllergy/:id', editAllergy);

// Doctor Routes
app.get('/doctors/:id', doctorsPage);
app.get('/addDoctor', addDoctorPage);
app.get('/editDoctor/:id', editDoctorPage);
app.get('/deleteDoctor/:id', deleteDoctor);
app.post('/addDoctor', addDoctor);
app.post('/editDoctor/:id', editDoctor);

// Nurse Routes
app.get('/Nurses/:id', nursesPage);
app.get('/addNurse', addNursePage);
app.get('/editNurse/:id', editNursePage);
app.get('/deleteNurse/:id', deleteNurse);
app.post('/addNurse', addNurse);
app.post('/editNurse/:id', editNurse);

// Insurance Routes
app.get('/insurance/:id', insurancePage);
app.get('/addInsurance', addInsurancePage);
app.get('/editInsurance/:id', editInsurancePage);
app.get('/deleteInsurance/:id', deleteInsurance);
app.post('/addInsurance', addInsurance);
app.post('/editInsurance/:id', editInsurance);

// Medication Routes
app.get('/medications/:id', medicationsPage);
app.get('/addMedication', addMedicationPage);
app.get('/editMedication/:id', editMedicationPage);
app.get('/deleteMedication/:id', deleteMedication);
app.post('/addMedication', addMedication);
app.post('/editMedication/:id', editMedication);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


// Used to check if logged in.
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }
  function checkAuthenticatedAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role == 'Admin') {
      return next()
    }
    res.redirect('/login')
  }


//   function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return res.redirect('/')
//     }
//     next()
//   }

