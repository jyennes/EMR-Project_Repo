const { randomInt } = require('crypto');
const fs = require('fs');
const crypto = require('../config/crypto');

module.exports = {
    addPatientPage: (req, res) => {
        if (req.user.role == 'Doctor' || req.user.role == 'Nurse'){
            res.render('add-patient.ejs', {
                title: "EMR Title",
                message: ''
            });
        }
        else {
        res.redirect('/');
        }
    },
    addPatient: (req, res) => {

        let message = '';
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var birthDate = req.body.birthDate
        var heightFeet = req.body.heightFeet
        var heightInches = req.body.heightInches
        var weight = req.body.weight
        // var areaCode = req.body.areaCode
        var phoneNumber = req.body.phoneNumber
        var email = req.body.email
        var street = req.body.street
        //let zipId = req.body.zipId
        //let docId = req.body.docId
        let patientId = req.body.patientId;


        var firstName = crypto.encrypt(firstName);
        var lastName = crypto.encrypt(lastName);
        var birthDate = crypto.encrypt(birthDate);
        var phoneNumber = crypto.encrypt(phoneNumber);
        var email = crypto.encrypt(email);
        var street = crypto.encrypt(street);
        var heightFeet = crypto.encrypt(heightFeet);
        var heightInches = crypto.encrypt(heightInches);
        var weight = crypto.encrypt(weight);

        let query = "INSERT INTO `patient` (firstName, lastName, birthDate, heightFeet, heightInches, weight, PhoneNumber, email, street, patientId) VALUES ('" +
            firstName + "', '" + lastName + "', '" + birthDate + "', '" + heightFeet + "', '" + heightInches + "', '" + weight + "', '" + phoneNumber + "', '" + email + "', '" + street + "', '" + patientId + "')";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    editPatientPage: (req, res) => {
        if (req.user.role == 'Doctor' || req.user.role == 'Nurse'){
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
        }
        else {
            res.redirect('/');
             }
    },
    editPatient: (req, res) => {
        let patientId = req.params.id;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        let birthDate = req.body.birthDate
        let heightFeet = req.body.heightFeet
        let heightInches = req.body.heightInches
        let weight = req.body.weight
        let areaCode = req.body.areaCode
        var phoneNumber = req.body.phoneNumber
        var email = req.body.email
        var street = req.body.street

        var firstName = crypto.encrypt(firstName);
        var lastName = crypto.encrypt(lastName);
        // var birthDate = crypto.encrypt(birthDate);
        var phoneNumber = crypto.encrypt(phoneNumber);
        var email = crypto.encrypt(email);
        var street = crypto.encrypt(street)

        // let query = 'UPDATE `patient` SET `firstName` = ?, WHERE `id` = ?', [firstName, patientId];
        let query = "UPDATE `patient` SET `firstName` = '" + firstName + "', `lastName` = '" + lastName + "', `birthDate` =  '" + birthDate + "', `heightFeet` = '" + heightFeet + "', `heightInches` = '" + heightInches + "', `weight` = '" + weight + "', `areaCode` = '" + areaCode + "', `phoneNumber` = '" + phoneNumber + "', `email` = '" + email + "', `street` = '" + street + "' WHERE `patient`.`id` = '" + patientId + "'";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePatient: (req, res) => {
        if (req.user.role == 'Doctor' || req.user.role == 'Nurse'){
            let patientId = req.params.id;
            let deleteUserQuery = 'DELETE FROM patient WHERE id = "' + patientId + '"';

            con.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        }
        else {
            res.redirect('/');
            }
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



