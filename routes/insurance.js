module.exports = {
    insurancePage: (req, res) => {
        let insuranceId = req.params.id;
        let query = "SELECT * FROM `insurance` WHERE id = '" + insuranceId + "' ";
        //let query = "SELECT * FROM `insurance` ORDER BY id ASC";

        con.query(query, (err, result) => {
            if (err) {
                res.redirect('/insurances');
            }
            res.render('insurance.ejs', {
                title: "Insurances"
                ,insurance: result
            });
        });
    },
    addInsurancePage: (req, res) => {
        res.render('add-insurance.ejs', {
            title: "Add insurance",
            message: ''
        });
    },

    addInsurance: (req, res) => {
        var name = req.body.name;
        var name = crypto.encrypt(name);

        let query = "INSERT INTO `insurance` (name) VALUES ('" + name + "')";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    editInsurancePage: (req, res) => {
        let insuranceId = req.params.id;
        let query = "SELECT * FROM `insurance` WHERE id = '" + insuranceId + "' ";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-insurance.ejs', {
                title: "Edit insurance",
                patient: result[0],
                message: ''
            });
        });
    },
    editInsurance: (req, res) => {
        var name = req.body.name;
        var name = crypto.encrypt(name);

        let query = "UPDATE `insurance` SET 'name' = '" + name + "'";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteInsurance: (req, res) => {
        let insuranceId = req.params.id;
        let deleteUserQuery = 'DELETE FROM patient WHERE id = "' + insuranceId + '"';

        con.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};