const express = require("express");
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const methodOverride=require('method-override');
const passport = require('passport');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

var mysqlConnection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "root",
	database : "invitations",
	multipleStatements : true
});

mysqlConnection.connect((err)=>{
	if(!err)
	{
		console.log("Connected");
	}
	else
	{
		console.log("Connection failed");
	}
});

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.render('login.ejs')
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
});

app.get('/register',checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
});

app.delete('/logout', (req,res)=>{
	req.session.loggedin=false;
	req.logOut();
	res.redirect('/login')
});

app.post('/register', checkNotAuthenticated,  (req,res)=>{
	try {
    
    var values=[
     [ req.body.name,
      req.body.username,
      req.body.email,
      req.body.password]
      
    ];
     var sql = "INSERT INTO users (name, username, email, password) VALUES ?";
    mysqlConnection.query(sql, [values], function (err, result) {
    if (err) throw err;
    res.redirect('/login');
    });
  } catch {
    res.redirect('/register')
  }
  console.log(values);

});

function checkAuthenticated(req, res, next) {
  if (req.session.loggedin) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.session.loggedin) {
   
    	return res.redirect('/dashboard');
   
  }

  next();
}

app.post('/login', checkNotAuthenticated, async (req,res)=>{
	try{
				var email = req.body.email;
		var password = req.body.password;
		

		var sql = "SELECT * FROM users WHERE email = ? AND password = ?";
			mysqlConnection.query(sql, [email,password], function(err, result) {
				if (err) throw err;
		
				if(result.length>0) {
					req.session.loggedin=true;
					req.session.username = result[0].username;
					req.session.name=result[0].name;
					sessUser=result[0].username;
					
						res.redirect('/dashboard');
						console.log(req.session.username);
					
				}else{
					
						console.log("incorrect");
					res.send('Incorrect Email or Password!');
				
					
				}		
				//res.end();
			});
		
	}catch{
		res.redirect('/login');
	}
	
	
});

app.get('/dashboard', checkAuthenticated, (req, res) => {
  res.render('dashboard')
});

app.get('/create', checkAuthenticated, (req, res) => {
  res.render('create')
});

app.get('/viewinvites', checkAuthenticated, (req, res) => {
	var sql='SELECT * FROM invites WHERE invitee=?';
    mysqlConnection.query(sql, req.session.name, function (err, data, fields) {
    	if (err) throw err;
    	res.render('viewinvites', {invites: data});
  	});
 
});

app.get('/myinvitations', checkAuthenticated, (req, res) => {
	var sql='SELECT * FROM invites WHERE invite_by=?';
    mysqlConnection.query(sql, req.session.username, function (err, data, fields) {
    	if (err) throw err;
    	res.render('myinvitations', {invites: data});
  	});
  
});

app.get('/accepted', checkAuthenticated, (req, res) => {
	var arr=[];
	var sql='SELECT * FROM invites WHERE invitee=?';
    mysqlConnection.query(sql, req.session.name, function (err, data, fields) {
    	if (err) throw err;
    	console.log(data);
    	for(var i=0;i<data.length;i++){
    	if(data[i].acc_rej=="accept"){
    		res.render('accepted', {invites: data});
    	}else{
    		res.render('accepted', {invites: arr});
    	}
    }
  	});
 
});

app.post('/create', checkAuthenticated,  (req,res)=>{
	try {
    
    var values=[
     [ req.body.eventname,
      req.body.date,
      req.body.header,
      req.body.body,
      req.body.footer,
      req.body.invitee,
      req.session.username]
      
    ];
     var sql = "INSERT INTO invites (eventname, date, header, body, footer, invitee, invite_by) VALUES ?";
    mysqlConnection.query(sql, [values], function (err, result) {
    if (err) throw err;
    res.redirect('/dashboard');
    });
  } catch {
    res.redirect('/dashboard')
  }
  console.log(values);

});
app.post('/acc_rej', checkAuthenticated,  (req,res)=>{
	try {
    
    var values=[
     [ req.body.acc_rej

      ]
      
    ];
     var sql = `UPDATE invites SET acc_rej=? WHERE invitee='${req.session.name}'`;
    mysqlConnection.query(sql, [values], function (err, result) {
    if (err) throw err;
    res.redirect('/dashboard');
    });
  } catch {
    res.redirect('/dashboard')
  }
  console.log(values);

});


app.listen(3000, ()=>console.log("Listening on port 3000"));




