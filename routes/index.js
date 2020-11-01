module.exports = {
    getHomePage: (req, res) => {
         let email = req.user.email 
         let query = "SELECT * FROM `patient` WHERE email = '" + email + "' ORDER BY id ASC";

        con.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "EMR Title"
                ,patient: result
            });
        });
    },
};