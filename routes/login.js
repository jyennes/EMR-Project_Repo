const bcrypt = require('bcrypt');
const passport = require('passport');

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
            const hashedPword = bcrypt.hash(req.body.pword, 10)
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
