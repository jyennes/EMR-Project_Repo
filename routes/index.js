module.exports = {
    getHomePage: (req, res) => {
         let email = req.user.email;
         let role = req.user.role; 
         let roleQuery = "SELECT * FROM `users` ORDER BY id ASC";
         let pQuery = "SELECT * FROM `patient` WHERE email = '" + email + "' ORDER BY id ASC";
         let dQuery = "SELECT * FROM `patient` ORDER BY id ASC";

        con.query(roleQuery, (err, result) => {
            if (role == `doctor`) {
                con.query(dQuery, (err, result) => {
                    if (err) {
                        res.redirect('/');
                    }
                    res.render('index.ejs', {
                        title: "EMR Title"
                        ,patient: result
                    });
                });
            }
            else {
                con.query(pQuery, (err, result) => {
                    if (err) {
                        res.redirect('/');
                    }
                    res.render('index.ejs', {
                        title: "EMR Title"
                        ,patient: result
                    });
                });
            }
        })
    },
};