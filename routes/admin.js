const crypto = require('../config/crypto');

module.exports = {
    adminPage: (req, res) => {
       // var role = req.body.role;
        let query = ("SELECT * FROM `users` ORDER BY id ASC");
        
        con.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            //decrypter(result);
            res.render('admin.ejs', {
                title: "Admin Home"
                ,users: result
            });
        })
    },
    role: (req, res) => {
        var role = req.body.role;
        let userId = req.params.id;
        let upQuery = ("UPDATE `users` SET `role` = '" + role + "' WHERE `users`.`id` = '" + userId +"'"); //"' WHERE `users`.`id` = '" + userId +
        con.query(upQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/admin');
        });
    },
    rolePage: (req, res) => {
        let id = req.params.id;
        let query = "SELECT * FROM `users` WHERE id = '" + id + "' ";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('adminRole.ejs', {
                title: "Change Role",
                users: result[0],
                message: ''
            });
        });
    }
};