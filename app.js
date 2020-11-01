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
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Declare route methods
const {getHomePage} = require('./routes/index');
const {addPatientPage, addPatient, editPatient, editPatientPage, deletePatient, patientRecPage} = require('./routes/patient');
const {allergiesPage} = require('./routes/allergies');

// login
const {loginPage, registerPage, registerUser, userAuth} = require('./routes/login');

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

// Routes
app.get('/',checkAuthenticated, getHomePage);
app.get('/add', addPatientPage);
app.get('/edit/:id', editPatientPage);
app.get('/delete/:id', deletePatient);
app.get('/record/:id', patientRecPage);
app.get('/allergies/:id', allergiesPage);
app.post('/add', addPatient);
app.post('/edit/:id', editPatient);

// Login Routes
app.get('/login', loginPage);
app.get('/register', registerPage);
app.post('/login', userAuth);
app.post('/register', registerUser);



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(function(id, done) {
    con.query("select * from users where id = "+id,function(err,rows){	
        done(err, rows[0]);
    });
})

passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'pword',
    passReqToCallBack: true

},function(email, pword, done) { 

    con.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
       if (err)
           return done(err);
        // const match = bcrypt.compareSync(((rows[0].pword), pword));
        if (!rows.length) {
           return done(null, false, console.log('No user found.')); 
       } 
       
       if (! (rows[0].pword == pword)) {
           return done(null, false, console.log('Wrong password.')); 
       }
       return done(null, rows[0]);			
   }); 
}));

// Used to check if logged in.
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
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
