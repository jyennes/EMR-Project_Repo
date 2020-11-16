module.exports = {
    medicationsPage: (req, res) => {
        let medicationId = req.params.id;
        let query = "SELECT * FROM `medication` WHERE id = '" + medicationId + "' ";
        //let query = "SELECT * FROM `medication` ORDER BY id ASC";

        con.query(query, (err, result) => {
            if (err) {
                res.redirect('/medications');
            }
            res.render('medications.ejs', {
                title: "Medications"
                ,medication: result
            });
        });
    },
    addMedicationPage: (req, res) => {
        res.render('add-medication.ejs', {
            title: "Add medication",
            message: ''
        });
    },

    addMedication: (req, res) => {
        var name = req.body.name;
        var name = crypto.encrypt(name);

        let query = "INSERT INTO `medication` (name) VALUES ('" + name + "')";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    editMedicationPage: (req, res) => {
        let medicationId = req.params.id;
        let query = "SELECT * FROM `medication` WHERE id = '" + medicationId + "' ";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-medication.ejs', {
                title: "Edit medication",
                patient: result[0],
                message: ''
            });
        });
    },
    editMedication: (req, res) => {
        var name = req.body.name;
        var name = crypto.encrypt(name);

        let query = "UPDATE `medication` SET 'name' = '" + name + "'";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteMedication: (req, res) => {
        let medicationId = req.params.id;
        let deleteUserQuery = 'DELETE FROM patient WHERE id = "' + medicationId + '"';

        con.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};