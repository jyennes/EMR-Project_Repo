const crypto = require('../config/crypto');
module.exports = {
    nurseAdminPage: (req, res) => {
        // var role = req.body.role;
         let query = ("SELECT * FROM `patient` ORDER BY id ASC");
         con.query(query, (err, result) => {
             if (err) {
                 res.redirect('/');
             }
             decrypter(result);
             res.render('nurseAdmin.ejs', {
                 title: "Nurse admin Home"
                 ,patient: result
             });
         })
     },
    nurseAssignPage: (req, res) => {
        let id = req.params.id;
        let query = "SELECT * FROM `patient` WHERE id = '" + id + "' ";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('nurseAssign.ejs', {
                title: "Assign Nurse",
                patient: result[0],
                message: ''
            });
        });
    },
    nurseAssign: (req, res) => {
        let id = req.params.id;
        let nurseId = req.body.nurseId;
        let query = ("UPDATE `patient` SET `nurseId` = '" + nurseId + "' WHERE `patient`.`id` = '" + id +"'"); //"' WHERE `users`.`id` = '" + userId +
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/nurseAdmin');
        });
    }
};

function decrypter(result) {
    for (var i = 0; i < result.length; i++) {
        result[i].email = crypto.decrypt(result[i].email)
    }
}
