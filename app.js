const express = require('express');

const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addteamPage,addteam,ScoreboardPage,TeamScorPage,addonep,addtwop,addthreeop,EliminateTeam,ActivateTeam} = require('./routes/team');

const port = 3030;

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BibleQuiz'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;
// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', getHomePage);
app.get('/add', addteamPage);
app.get('/scorbord',ScoreboardPage);
app.get('/tscore/:id',TeamScorPage);
app.get('/addone/:id',addonep);
app.get('/addtwo/:id',addtwop);
app.get('/addthree/:id',addthreeop);
app.post('/add', addteam);
app.get('/teamDeactiveted/:id', EliminateTeam);
app.get('/teamReacitivate/:id', ActivateTeam);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
