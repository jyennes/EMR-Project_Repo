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
}
}