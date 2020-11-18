//route for doctors
module.exports = {
    doctorsPage: (req, res) => {
        let doctorId = req.params.id;
        let query = "SELECT * FROM `doctor` WHERE id = '" + doctorId + "' ";
        //let query = "SELECT * FROM `doctor` ORDER BY id ASC";

        con.query(query, (err, result) => {
            if (err) {
                res.redirect('/doctors');
            }
            res.render('doctors.ejs', {
                title: "Doctors"
                ,doctor: result
            });
        });
    },
    addDoctorPage: (req, res) => {
        res.render('add-doctor.ejs', {
            title: "Add doctor",
            message: ''
        });
    },

    addDoctor: (req, res) => {
        var lastName = req.body.lastName;
        var firstName = req.body.firstName;

        var lastName = crypto.encrypt(lastName);
        var firstName = crypto.encrypt(firstName);

        let query = "INSERT INTO `doctor` (lastName, firstName) VALUES ('" + lastName + "', '" + firstName + "')";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    editDoctorPage: (req, res) => {
        let doctorId = req.params.id;
        let query = "SELECT * FROM `doctor` WHERE id = '" + doctorId + "' ";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-doctor.ejs', {
                title: "Edit doctor",
                patient: result[0],
                message: ''
            });
        });
    },
    editDoctor: (req, res) => {
        var lastName = req.body.lastName;
        var firstName = req.body.firstName;

        var lastName = crypto.encrypt(lastName);
        var firstName = crypto.encrypt(firstName);

        let query = "UPDATE `doctor` SET 'lastName' = '" + lastName + "', `firstName` = '" + firstName + "'";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteDoctor: (req, res) => {
        let doctorId = req.params.id;
        let deleteUserQuery = 'DELETE FROM patient WHERE id = "' + doctorId + '"';

        con.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};