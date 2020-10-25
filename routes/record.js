const fs = require('fs');

module.exports = {
    getRecordPage: (req, res) => {
        let query = "SELECT * FROM `allergy` ORDER BY id ASC";

        con.query(query, (err, result) => {
            if (err) {
                res.redirect('/record');
            }
            res.render('record.ejs', {
                title: "EMR Title"
                ,allergy: result
            });
        });
    },
    allergiesPage: (req, res) => {
        let allergyId = req.params.id;
        let query = "SELECT * FROM `allergy` WHERE id = '" + allergyId + "' ";
        con.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('allergies.ejs', {
                title: "Allergies",
                allergy: result[0],
                message: ''
            });
        });
    }
};