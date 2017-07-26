
// Begin Gavin code-along

// Using the expressn and mustache-express libraries
const express = require('express');
const mustacheExpress = require('mustache-express');


// Build the express app
const app = express();

// Bring in our data
const userDirectory = require('./data');
// test that this pumps to terminal
console.log(userDirectory);

// Teach our app to use the mustache engine for rendering template
app.engine('mustache', mustacheExpress());

// Teach our app what directory to find our views (templates)
app.set('views', './views');

// Teach our app to use mustache for our templates
app.set('view engine', 'mustache');

// // Use middleware for static files - CSS, images, videos, fonts, etc
app.use(express.static('public'));

// Test that we are linked to local host correctly
app.get('/', (request, response) => {
  // response.send("Hello World!")

  response.render('home', userDirectory);
})

// Test that we are linked to terminal correctly
app.listen(3000, function() {
	console.log('Successfully started express application, yo!');
});












// const path = require("path");
// const data = require('./data');

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

// Got user data to load to mustache
// app.get('/home', (request, response) => {
//   const user_data = {
//     image: 'https://robohash.org/blanditiisexercitationemquaerat.png?size=150x150&set=set1',
//     name: 'Hamlen Juza',
//     job: 'Engineer IV',
//     company: 'Stark, Feil and Bode',
//   }
//   response.render('home', user_data)
// })

// render from mustache, spitting out data variable
// app.get('/index', function (require, response) {
//   response.render(data);
// });
