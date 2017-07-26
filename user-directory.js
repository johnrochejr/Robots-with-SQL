const express = require('express');
const mustacheExpress = require('mustache-express');
const data = require('./data');
const app = express();

// // Use middleware for static files

app.use(express.static('public'));


app.engine('mustache', mustacheExpress());
app.set('views', './templates');
app.set('view engine', 'mustache');


// app.get is similar to our old friend addEventListener
// except we are listening for requests from a
// browser
//
// document.addEventListener('click', (event) => {
//
// })


// Link to node is good
// app.get('/index', function (require, response) {
//   response.send("Watttttappppp");
// });

// robots showing up
// app.get('/index', function (require, response) {
//   response.render("index");
// });

app.get('/index', (request, response) => {
  const user_data = {
    image: 'https://robohash.org/blanditiisexercitationemquaerat.png?size=150x150&set=set1',
    name: 'Hamlen Juza',
    job: 'Engineer IV',
    company: 'Stark, Feil and Bode',
  }
  response.render('index', user_data)
})

// render from mustache, spitting out data variable
// app.get('/index', function (require, response) {
//   response.render(data);
// });

app.listen(3000, function() {
	console.log('Successfully started express application, yo!');
});
