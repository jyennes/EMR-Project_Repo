const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const salt = bcrypt.genSaltSync(10);
const crypto = require('../config/crypto');

module.exports = {
    loginPage: (req, res) => {
        res.render('login.ejs', {
            title: "Login"
        });
    },

    userAuth: (req, res, next) => {
        console.log(req.body);
        passport.authenticate('login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
            })(req, res, next);
    },


    registerUser: (req, res, next) => {
        console.log(req.body);
        passport.authenticate('register', {
            successRedirect: '/code',
            failureRedirect: '/register',
            failureFlash: true
            })(req, res, next);
    },

    registerPage: (req, res) => {
        res.render('register.ejs', {
            title: "Register"
        });
    },

    codePage: (req, res) => {
        res.render('code.ejs', {
            title: "Copy this code"
        });
    },

    logout: (req, res) => {
        req.logout();
		res.redirect('/');
    }
};

// serialize and deserialize user instance to form session
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(function(id, done) {
    con.query("select * from users where id = "+id,function(err,rows){	
        done(err, rows[0]);
    });
})


// Verify user and password with local strategy.
passport.use('login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'pword',
    passReqToCallback : true
},
    function(req, email, pword, done) { 
        
        con.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err, rows){        
            if (err)
                return done(err);
            if (!(rows.length)) {
                return done(null, false, {message: 'Incorect user, password, or code'} ); //&& console.log('User does not exist')
            } 
            if (! (bcrypt.compareSync(pword, rows[0].pword))) {
                return done(null, false, {message: 'Incorect user, password, or code'}); 
            }
            var code = req.body.code
            if (!(rows[0].code == code)) {
                return done(null, false, {message: 'Incorect user, password, or code'}); 
            }
            return done(null, rows[0]);			
        })
    }, 
));

//register with passport
passport.use('register', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'pword',
  passReqToCallback : true
},
function(req, email, pword, done) {

  con.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
      if (err) return done(err);
      if (rows.length) {
        return done(null, false, {message: 'Email is already taken'});
      }
       else {
        if (req.body.pword !== req.body.confirmPword) {
            return done(null, false, { message: 'Passwords do not match' });
        }
        var user = {
            username: email,
            password: pword,
        };
        var code = crypto.randomString();
        // const encEmail = crypto.encrypt(email);
        const hashedPword = bcrypt.hashSync(pword, salt);
        var query = "INSERT INTO `users` (email, pword, code) VALUES ('" + email + "', '" + hashedPword + "', '" + code + "')";
        con.query(query,function(err, rows){
          user.id = rows.insertId;
          return done(null, user);
        });
       }
  });
}));



