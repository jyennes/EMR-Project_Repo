//const fs = require('fs');

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
    }

};