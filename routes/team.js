module.exports = {
  addteamPage: (req, res) => {



        res.render('add_team.ejs', {
            title: "Welcome to Socka | Add a new player"
            ,message: '',

        });
    },
    addteam: (req, res) => {
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
    ScoreboardPage: (req, res) => {
        let query = "SELECT * FROM `team`,`team_score` where `team`.`t_id`=`team_score`.`t_id` and `team`.`status`='active'";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('scoreboard.ejs', {
                title: "Welcome to BibleQuiz | View Team"
                ,teams: result
            });
        });
    },
    TeamScorPage: (req, res) => {
      let team_id=req.params.id;
        let query = "SELECT * FROM `team`,`team_score` where `team`.`t_id`=`team_score`.`t_id` and `team`.`t_id`='"+team_id+"' and `team`.`status`='active'";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('TeamScore.ejs', {
                title: "Welcome to BibleQuiz | View Team"
                ,teams: result
            });
        });
    },
    addonep: (req, res) => {
      let team_id=req.params.id;
        let query = "UPDATE `team_score` set `team_score`=`team_score`+1 where `t_id`='"+team_id+"'";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.redirect('/');
            message="One Point Added";
            res.render('TeamScore.ejs', {

                title: "Welcome to BibleQuiz | View Team",
                message,
                teams: result
            });
        });
    },
    addtwop: (req, res) => {
      let team_id=req.params.id;
        let query = "UPDATE `team_score` set `team_score`=`team_score`+2 where `t_id`='"+team_id+"'";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.redirect('/');
            message="One Point Added";
            res.render('TeamScore.ejs', {

                title: "Welcome to BibleQuiz | View Team",
                message,
                teams: result
            });
        });

    },addthreeop: (req, res) => {
      let team_id=req.params.id;
        let query = "UPDATE `team_score` set `team_score`=`team_score`+2 where `t_id`='"+team_id+"'";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.redirect('/');
            message="One Point Added";
            res.render('TeamScore.ejs', {

                title: "Welcome to BibleQuiz | View Team",
                message,
                teams: result
            });
        });

    },
    EliminateTeam: (req, res) => {
        let team_id=req.params.id;
          let query = "UPDATE `team` set `status`='Deactivated' where `t_id`='"+team_id+"'";
  
          // execute query
          db.query(query, (err, result) => {
              if (err) {
                  res.redirect('/');
              }
              res.redirect('/');
              message="Team eliminated";
              res.render('index.ejs', {
  
                  title: "Welcome to BibleQuiz | View Team",
                  message,
                  teams: result
              });
          });
  
      },
      ActivateTeam: (req, res) => {
        let team_id=req.params.id;
          let query = "UPDATE `team` set `status`='Active' where `t_id`='"+team_id+"'";
  
          // execute query
          db.query(query, (err, result) => {
              if (err) {
                  res.redirect('/');
              }
              res.redirect('/');
              message="Team eliminated";
              res.render('index.ejs', {
  
                  title: "Welcome to BibleQuiz | View Team",
                  message,
                  teams: result
              });
          });
  
      },


};
