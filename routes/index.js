const crypto = require('../config/crypto');
module.exports = {
    getHomePage: (req, res) => {
         let email = req.user.email;
         let id = req.user.id;
         let role = req.user.role;
        //  let nurseId = req.user.id;
         let roleQuery = ("SELECT * FROM `users` ORDER BY id ASC");
         let pQuery = ("SELECT * FROM `patient` WHERE patientId = '" + id + "' ORDER BY id ASC");
         let dQuery = ("SELECT * FROM `patient` ORDER BY id ASC");
         let nQuery = ("SELECT * FROM `patient` WHERE nurseId = '" + id + "' ORDER BY nurseId ASC");

        con.query(roleQuery, (err, result) => {
            if (role == `Doctor`) {
                con.query(dQuery, (err, result) => {
                    if (err) {
                        res.redirect('/');
                    }
                    decrypter(result);
                    res.render('index.ejs', {
                        title: "Doctor Home"
                        ,patient: result
                    });
                });
            }
            else if (role == `Nurse`) {
                con.query(nQuery, (err, result) => {
                    if (err) {
                        res.redirect('/');
                    }
                    decrypter(result);
                    res.render('index.ejs', {
                        title: "Nurse Home"
                        ,patient: result
                    });
                });
            }
            else {
                con.query(pQuery, (err, result) => {
                    if (err) {
                        res.redirect('/');
                    }
                    decrypter(result);
                    res.render('index.ejs', {
                        title: "Patient Home"
                        ,patient: result
                    });
                });
            }
        })
    },
};

function decrypter(result) {
    for (var i = 0; i < result.length; i++) {
        result[i].lastName = crypto.decrypt(result[i].lastName)
    }
    for (var i = 0; i < result.length; i++) {
        result[i].firstName = crypto.decrypt(result[i].firstName)
    }
    for (var i = 0; i < result.length; i++) {
        result[i].phoneNumber = crypto.decrypt(result[i].phoneNumber)
    }
    for (var i = 0; i < result.length; i++) {
        result[i].email = crypto.decrypt(result[i].email)
    }
    for (var i = 0; i < result.length; i++) {
        result[i].street = crypto.decrypt(result[i].street)
    }
}