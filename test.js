module.exports = {
    addPlayerPage: (req, res) => {
      let t_id=req.body.tid;
      let t_name=req.body.tname;
      let t_color=req.body.tcolor;
        let team_name="SELECT * FROM `team` where Team_name='"+t_name+"'";

        // execute query
        db.query(team_name, (err, result) => {
            if (err) {
              return res.status(500).send(err);
                res.redirect('/');
            }
            if (result.length > 0) {
                message = 'Team already exists';
                res.render('add_team.ejs', {
                    message,
                    title: ""
                });
            }else{
              let addquery="INSERT INTO `team` (`t_id`, `Team_name`, `Team_color`) VALUES ('"+t_id+"', '"+t_name+"', '"+t_color+"')";
              db.query(addquery,(err,result)=>{
                if(err)
                {
                  return res.status(500).send(err);
                  res.redirect('/');
                }else{
                  message="successFully inserted data";
                  res.render('add_team.ejs', {
            message,
            title: "Add new Team"
        });

                }

              });
              let addscore="INSERT INTO `team_score` (`Scor_id`, `t_id`, `team_score`) VALUES (NULL, '"+t_id+"', '0')";
              db.query(addscore,(err,result)=>{
                if(err)
                {
                  return res.status(500).send(err);
                  res.redirect('/');
                }else{
                  message="successFully inserted data";
                  res.render('add_team.ejs', {
            message,
            title: "Add new Team"
        });

                }
              });
            }
        });
    },
};
