module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `patient` ORDER BY id ASC";

        con.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "EMR Title" | "View Patients"
                ,patient: result
            });
        });
    },
};