const fs = require('fs');

module.exports = {
    addPatientPage: (req, res) => {
        res.render('add-patient.ejs', {
            title: "EMR Title" | "Add new patient"
            ,message: ''
        });
    },
     addPatient: (req, res) => {

        let message = '';
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;

        let query = "INSERT INTO `patient` (firstName, lastName) VALUES ('" + firstName + "', '" + lastName + "')";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    editPatientPage: (req, res) => {
        let patientId = req.params.id;
        let query = "SELECT * FROM `patient` WHERE id = '" + patientId + "' ";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-patient.ejs', {
                title: "Edit patient"
                ,patient: result[0]
                ,message: ''
            });
        });
    },
    editPatient: (req, res) => {
        let patientId = req.params.id;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;

        let query = "UPDATE `patient` SET 'firstName' =  '" + firstName + "', 'lastName' = '" + lastName + "' WHERE `players`.`id` = '" + playerId + "'";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePatient: (req, res) => {
        let patientId = req.params.id;
        let deleteUserQuery = 'DELETE FROM patient WHERE id = "' + patientId + '"';

        con.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};