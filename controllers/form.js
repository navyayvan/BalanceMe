var express = require('express');
var db = require('../models');
var router = express.Router();


router.post('/intellectual', function(req,res) {
	db.user.findById(req.session.userId).then(function(user) {
		user.intellectual = req.body.intl;
		user.save();
		res.redirect('/form')
	})

});

router.post('/sociallife', function(req,res) {
	db.user.findById(req.session.userId).then(function(user) {
		user.sociallife = req.body.sl;
		user.save();
		res.redirect('/form')
	})
});

router.post('/work', function(req,res) {
	db.user.findById(req.session.userId).then(function(user) {
		user.work = req.body.wrk;
		user.save();
		res.redirect('/form')
	})
});

router.post('/intimacy', function(req,res) {
	db.user.findById(req.session.userId).then(function(user) {
		user.intimacy = req.body.intmcy;
		user.save();
		res.redirect('/form')
	})
});

router.post('/exercise', function(req,res) {
	db.user.findById(req.session.userId).then(function(user) {
		user.exercise = req.body.ex;
		user.save();
		res.redirect('/form')
	})
});

router.post('/mentalhealth', function(req,res) {
	db.user.findById(req.session.userId).then(function(user) {
		user.mentalhealth = req.body.mh;
		user.save();
		res.redirect('/form')
	})
});


module.exports = router;