var express = require('express');
var	bodyParser = require('body-parser');
var app = express();
var db = require("./models");
var session = require('express-session');
var flash = require('connect-flash');
var ejsLayouts= require('express-ejs-layouts');

app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
	secret: 'rndmcharacterstopreventtampering',
	resave: false,
	saveUninitialized: true
}));

app.use(flash());

app.use(function(req, res, next) {
	if (req.session.userId) {
		db.user.findById(req.session.userId).then(function(user) {
			req.currentUser = user;
			res.locals.currentUser = user;
			next();
		});	
	} else {
		req.currentUser = false;
		res.locals.currentUser = false;
		next();
	}
});


app.get('/', function(req,res) {
	res.render('index', {alerts: req.flash()});
});

app.get('/secret', function(req,res) {
	if (req.currentUser) {
		res.render('secret');
	} else {
		req.flash('danger', 'you must be logged in to view this page');
		res.redirect('/')
	}
})

app.use('/auth', require('./controllers/auth'));



app.listen(3000);