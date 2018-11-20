module.exports = {
    getHomePage: (req, res) => {
      let message='';
        let query = "SELECT * FROM `team`,`team_score` where `team`.`t_id`=`team_score`.`t_id`";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Socka | View Players",
                message:'',
                teams: result
            });
        });
    },
};
