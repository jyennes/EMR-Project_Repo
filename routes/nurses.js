// routes for nurses
module.exports = {
    nursesPage: (req, res) => {
        let nurseId = req.params.id;
        let query = "SELECT * FROM `nurse` WHERE id = '" + nurseId + "' ";
        //let query = "SELECT * FROM `nurse` ORDER BY id ASC";

        con.query(query, (err, result) => {
            if (err) {
                res.redirect('/nurses');
            }
            res.render('nurses.ejs', {
                title: "Nurses"
                ,nurse: result
            });
        });
    },
    addNursePage: (req, res) => {
        res.render('add-nurse.ejs', {
            title: "Add nurse",
            message: ''
        });
    },

    addNurse: (req, res) => {
        var name = req.body.name;
        var name = crypto.encrypt(name);

        let query = "INSERT INTO `nurse` (name) VALUES ('" + name + "')";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    editNursePage: (req, res) => {
        let nurseId = req.params.id;
        let query = "SELECT * FROM `nurse` WHERE id = '" + nurseId + "' ";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-nurse.ejs', {
                title: "Edit nurse",
                patient: result[0],
                message: ''
            });
        });
    },
    editNurse: (req, res) => {
        var name = req.body.name;
        var name = crypto.encrypt(name);

        let query = "UPDATE `nurse` SET 'name' = '" + name + "'";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteNurse: (req, res) => {
        let nurseId = req.params.id;
        let deleteUserQuery = 'DELETE FROM patient WHERE id = "' + nurseId + '"';

        con.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};