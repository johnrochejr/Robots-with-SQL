const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('templates', './templates');
app.set('view engine', 'mustache');

//Listening on root
// app.get('/todo/', function (req, res) {
//   res.render('todo');
// });

app.get('/index', function(require, response) {
	response.send('Hello World!');
});

app.listen(3000, function() {
	console.log('Successfully started express application, yo!');
});
