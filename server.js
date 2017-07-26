
// Using the express and mustache-express libraries 1
const express = require('express');
const mustacheExpress = require('mustache-express');

// Build the express app 4
const app = express();

// Bring in our data (find it in the current directory ('./') 9
// named 'data.js')
const userDirectory = require(.'data');

// Teach App to use the mustache engine for rendering templates 4
// rendering = "draw" on HTML
app.engine('mst', mustacheExpress());

// Teach our app what directory to find our 'views' or templates 5
// live
app.set('views', './views');

// Teach our app to use mustache for our templates 6
app.set('view engine', 'mst');

// Link CSS file to server.js
// Tell App to go to 'public' for static assets
app.use(express.static('public'));




// test to see we're linked to local host
// Testing to see if content is being pulled from mustache 7
// to local
app.get('/', (request, response) => {
  // response.send("Hello from JS land!") 2

  // response.render('home'); // 'home' is our mustache file 8

  // add userDirectory to sync data.js into home.mst
    response.render('home', userDirectory) // 9
})



// Test to see we are pumping info into terminal 3
app.listen(3000, () => {
  console.log('Our app is listening on port 3000!!!!!!!!!!');
})







































// ***************************************************** START

// Bring in our data
// const userDirectory = require('./data');
// // test that this pumps to terminal
// console.log(userDirectory);
//
// // Teach our app to use the mustache engine for rendering template
// app.engine('mustache', mustacheExpress());
//
// // Teach our app what directory to find our views (templates)
// app.set('views', './views');
//
// // Teach our app to use mustache for our templates
// app.set('view engine', 'mustache');
//
// // // Use middleware for static files - CSS, images, videos, fonts, etc
// app.use(express.static('public'));
//
// // Test that we are linked to local host correctly
// app.get('/', (request, response) => {
//   // response.send("Hello World!")
//
//   response.render('home', userDirectory);
// })
//
// // Test that we are linked to terminal correctly
// app.listen(3000, function() {
// 	console.log('Successfully started express application, yo!');
// });

// **************************************************** END
