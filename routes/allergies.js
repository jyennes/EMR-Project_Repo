//const fs = require('fs');
const crypto = require('../config/crypto');


module.exports = {
    allergiesPage: (req, res) => {
        let allergyId = req.params.id;
        let query = "SELECT * FROM `allergy` WHERE id = '" + allergyId + "' ";
        //let query = "SELECT * FROM `allergy` ORDER BY id ASC";

        con.query(query, (err, result) => {
            if (err) {
                res.redirect('/allergies');
            }
            res.render('allergies.ejs', {
                title: "Allergies"
                ,allergy: result
            });
        });
    },

    addAllergyPage: (req, res) => {
        res.render('add-allergy.ejs', {
            title: "Add Allergy",
            message: ''
        });
    },

    addAllergy: (req, res) => {
        var name = req.body.name;
        var name = crypto.encrypt(name);

        let query = "INSERT INTO `allergy` (name) VALUES ('" + name + "')";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    editAllergyPage: (req, res) => {
        let allergyId = req.params.id;
        let query = "SELECT * FROM `allergy` WHERE id = '" + allergyId + "' ";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-allergy.ejs', {
                title: "Edit Allergy",
                patient: result[0],
                message: ''
            });
        });
    },
    editAllergy: (req, res) => {
        var name = req.body.name;
        var name = crypto.encrypt(name);

        let query = "UPDATE `allergy` SET 'name' = '" + name + "'";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteAllergy: (req, res) => {
        let allergyId = req.params.id;
        let deleteUserQuery = 'DELETE FROM patient WHERE id = "' + allergyId + '"';

        con.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }

};