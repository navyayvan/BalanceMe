var express = require('express');
var	bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req,res) {
	res.render('index', {name: 'Navya'});
})



app.listen(3000);