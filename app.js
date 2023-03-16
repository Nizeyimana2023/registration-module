var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
  const playerController = require('./routes/players.controller')
  const homeController = require('./routes/home.controller');
  const fileUpload = require('express-fileupload');
  const fs = require('fs');
  const cors=require("cors");
  

  
  
  var createError = require('http-errors');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');

 
  


var session = require('express-session');
var sampledataRouter = require('./routes/sample_data');
var app = express();

var createError = require('http-errors');
var path = require('path');
var flash = require('connect-flash');

var mysql  = require('mysql');
var bodyParser=require("body-parser");
/*
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'ulk'
            });
 
connection.connect();
 
global.db = connection;
*/



app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin:["http://localhost:3000"]
  })
);
 
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('/public'));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'stylesheet')));




app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              //cookie: { maxAge: 60000 }
              cookie: { maxAge: 24 * 60 * 60 * 1000} // 24 hours
            }))

  

 app.use(flash());

 
app.get('/', routes.index);
app.get('/online_student_register', user.studentregister);
app.post('/online_student_register', user.studentregister);
/*
app.post('/', user.login);
app.get('/signup', user.signup);
app.post('/signup', user.signup);

app.get('/login', routes.index);
app.post('/login', user.login);
app.get('/users/dashboard', user.dashboard);
app.get('/users/view_users', user.viewUsers);
app.get('/users/mng_users', user.mngUsers);
app.get('/users/mng_players', homeController.getHomePage);
//app.use('/users/sample_data', sampledataRouter);
app.use('/users/sample_data', sampledataRouter);
app.get('/users/sample_data', sampledataRouter);
app.get('/users_edit_users/edit', user.editUsers);
app.get('/users/attendance', user.attendance);
app.post('/users/attendance', user.attendance);
app.get('/users/logout', user.logout);
app.get('/home/profile',user.profile);
app.get('/home/department',user.department);
//controller
app.get('/users/add_player', playerController.addPlayerPage);
//app.get('player/edit/:id', playerController.editPlayerPage);
app.get('/users_edit_player/:id', playerController.editPlayerPage);
app.get('/users_delete_player/:id', playerController.deletePlayer);

app.post('/users/add_player', playerController.addPlayer);
app.post('/users_edit_player/:id', playerController.editPlayer);
*/
module.exports = app;


app.get('*', function(req, res, next){
  res.status(404);

  res.render('404.ejs', {
      title: "Page Not Found",
  });

});

//end

app.listen(3000)


