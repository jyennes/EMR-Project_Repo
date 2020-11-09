const bcrypt = require('bcrypt');
const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
const salt = bcrypt.genSaltSync(10);
const GoogleAuthenticator = require('passport-2fa-totp').GoogeAuthenticator;
const TwoFAStrategy = require('passport-2fa-totp').Strategy;

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
            successRedirect: '/2fa',
            failureRedirect: '/register',
            failureFlash: true
            })(req, res, next);
    },

    registerPage: (req, res) => {
        res.render('register.ejs', {
            title: "Register"
        });
    },

    twoFactorPage: (req, res) => {
        var err = {message: '2fa Error'};
        var qrInfo = GoogleAuthenticator.register(req.user.email);
        req.session.qr = qrInfo.secret;

        res.render('2fa.ejs', {
            title: "Two Factor",
            errors: err,
            qr: qrInfo.qr
        });
    },

    twoFactor: (req, res, next) => {
        if (!req.session.qr) {
            {message: '2fa error'};
            return res.redirect('/2fa');
        }(req, res, next);
        // users = ("SELECT * FROM `users` WHERE `email` = '" + email + "'", function(err, rows){
        //     if (err) {
        //         console.log("error");
        //         return res.redirect('/2fa');
        //     }
        //     users.update
        // })
    },
};


// serialize and deserialize user instance to form session
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(function(id, done) {
    con.query("select * from users where id = "+id,function(err,rows){	
        done(err, rows[0]);
    });
})

// Verify user and password with local strategies.
passport.use('login', new TwoFAStrategy({
    usernameField : 'email',
    passwordField : 'pword',
    passReqToCallBack: true,
    skipTotpVerification: true
},
function(email, pword, done) { 

    con.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err, rows){
       if (err)
           return done(err);
           if (!rows.length) {
           return done(null, false, {message: 'Incorect user or password'} && console.log('User does not exist')); 
       } 
       if (! (bcrypt.compareSync(pword, rows[0].pword))) {
           return done(null, false, {message: 'Incorrect user or password'}); 
       }
       return done(null, rows[0]);			
   })
}, function(email, done) {
      con.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows) {
        if (!rows.secret) {
            done(new Error("Google Authenticator is not setup."));
        } else {
            var secret = GoogleAuthenticator.decodeSecret(rows.secret);
            done(null, secret, 30);
        }
      })
}
));

//register with passport
passport.use('register', new TwoFAStrategy({
  usernameField : 'email',
  passwordField : 'pword',
  passReqToCallBack: true,
  skipTotpVerification: true
},
function(email, pword, done) {

  con.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
      if (err) return done(err);
      if (rows.length) {
        return done(null, false, {message: 'Email is already taken'});
      }
      // else {
        var newUser = new Object();
        newUser.email = email;
        newUser.pword = pword;
        const hashedPword = bcrypt.hashSync(pword, salt);
        var query = "INSERT INTO `users` (email, pword) VALUES ('" + email + "', '" + hashedPword + "')";
        con.query(query,function(err, rows){
          newUser.id = rows.insertId;

          return done(null, newUser);
        });
      // }
  });
}));