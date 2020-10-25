const fs = require('fs');

module.exports = {
    addPatientPage: (req, res) => {
        res.render('add-patient.ejs', {
            title: "EMR Title",
            message: ''
        });
    },
    addPatient: (req, res) => {

        let message = '';
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let birthDate = req.body.birthDate
        let heightFeet = req.body.heightFeet
        let heightInches = req.body.heightInches
        let weight = req.body.weight
        let areaCode = req.body.areaCode
        let PhoneNumber = req.body.PhoneNumber
        let email = req.body.email
        let street = req.body.street
        //let zipId = req.body.zipId
        //let docId = req.body.docId

        let query = "INSERT INTO `patient` (firstName, lastName, birthDate, heightFeet, heightInches, weight, areaCode, PhoneNumber, email, street) VALUES ('" +
            firstName + "', '" + lastName + "', '" + birthDate + "', '" + heightFeet + "', '" + heightInches + "', '" + weight + "', '" + areaCode + "', '" + PhoneNumber + "', '" + email + "', '" + street + "')";
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
                title: "Edit patient",
                patient: result[0],
                message: ''
            });
        });
    },
    editPatient: (req, res) => {
        let patientId = req.params.id;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let birthDate = req.body.birthDate
        let heightFeet = req.body.heightFeet
        let heightInches = req.body.heightInches
        let weight = req.body.weight
        let areaCode = req.body.areaCode
        let PhoneNumber = req.body.PhoneNumber
        let email = req.body.email
        let street = req.body.street

        // let query = 'UPDATE `patient` SET `firstName` = ?, WHERE `id` = ?', [firstName, patientId];
        let query = "UPDATE `patient` SET `firstName` = '" + firstName + "', `lastName` = '" + lastName + "', `birthDate` =  '" + birthDate + "', `heightFeet` = '" + heightFeet + "', `heightInches` = '" + heightInches + "', `weight` = '" + weight + "', `areaCode` = '" + areaCode + "', `phoneNumber` = '" + PhoneNumber + "', `email` = '" + email + "', `street` = '" + street + "' WHERE `patient`.`id` = '" + patientId + "'";
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
    },
    patientRecPage: (req, res) => {
        let patientId = req.params.id;
        let query = "SELECT * FROM `patient` WHERE id = '" + patientId + "' ";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('record.ejs', {
                title: "Patient Record",
                patient: result[0],
                message: ''
            });
        });
    }
};



