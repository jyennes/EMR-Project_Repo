const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const salt = bcrypt.genSaltSync(10);
// module.exports = salt;

module.exports = {
    loginPage: (req, res) => {
        res.render('login.ejs', {
            title: "Login"
        });
    },

    userAuth: (req, res, next) => {
        console.log(req.body);
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
            })(req, res, next);
        },

    registerUser: (req, res) => {

            // let loginId = req.params.id;
            let email = req.body.email;
            const hashedPword = bcrypt.hashSync(req.body.pword, salt)
            //let pword = req.body.pword;

            let query = "INSERT INTO `users` (email, pword) VALUES ('" + email + "', '" + hashedPword + "')";
            con.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/register');
            });
    },

    registerPage: (req, res) => {
        res.render('register.ejs', {
            title: "Register"
        })
    }
};

// serialize and deserialize user instance to form session
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(function(id, done) {
    con.query("select * from users where id = "+id,function(err,rows){	
        done(err, rows[0]);
    });
})

// Verify user and password with local strategies.
passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'pword',
    passReqToCallBack: true

},function(email, pword, done) { 

    con.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
       if (err)
           return done(err);
           if (!rows.length) {
           return done(null, false, {message: 'Incorect user or password'} && console.log('User does not exist')); 
       } 
       if (! (bcrypt.compareSync(pword, rows[0].pword))) {
           return done(null, false, {message: 'Incorrect user or password'}); 
       }
       return done(null, rows[0]);			
   }); 
}));