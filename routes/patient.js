const fs = require('fs');

module.exports = {
    addPatientPage: (req, res) => {
        res.render('add-patient.ejs', {
            title: "EMR Title" | "Add new patient"
            ,message: ''
        });
    },
    addPatient: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
    }
}