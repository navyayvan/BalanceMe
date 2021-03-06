var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/signup', function(req,res) {
	res.render('auth/signup')
});

router.post('/signup', function(req,res) {
	db.user.findOrCreate({
		where: {
			email: req.body.email
		},
		defaults: {
			name: req.body.name,
			password: req.body.password
		}
	}).spread(function(user,created) {
		res.redirect('/');
	}).catch(function(err) {
		res.send(err)
	});
});

router.get('/login', function(req,res) {
	res.render('auth/login');
});

router.post('/login', function(req,res) {
	var email = req.body.email;
	var password = req.body.password;
	db.user.authenticate(email, password, function(err, user) {
		if (err) {
			res.send(err);
		} else if (user) {
			req.session.userId = user.id;
			req.flash('success', 'you logged in beyotch!');
			res.redirect('/')
		}
		else {
			res.send('user and/or password is invalid!!');
		}
	});
});

router.get('/logout', function(req,res) {
	req.session.userId = false;
	req.flash('danger', 'you logged out beyotch!');
	res.redirect('/');
})

module.exports = router;