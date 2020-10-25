const fs = require('fs');

module.exports = {
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