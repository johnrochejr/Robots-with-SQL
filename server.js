
// Using the express and mustache-express libraries 1
const express = require('express');
const mustacheExpress = require('mustache-express');

// Build the express app 4
const app = express();

// Bring in our data (find it in the current directory ('./') 9
// named 'data.js')
const userDirectory = require('./data');

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

// Dynamically add content to 'home' through data.js 10
// Mustache updated with {{}}
// (`/info/`) is new page off of local host: home
// use backticks ``
// sent to 'info' when click on <a>
app.get('/info/:id', (request, response) => {
//
// Get me information about the person who has id (:id, e.g.
// ... /info/1, /info/2
// response.send(`info about user id = ${request.params.id}`); 11
//


// First, get the `id` from the params (from the URL), this comes from 12
// the `:id` part
// request.params is an object with the id object
//
  const requestId = parseInt(request.params.id);
// we use parseInt() here because when we use mustache tags
// in <h3><a href="/info/{{id}}-{{username}}">{{name}}</a></h3>",
// the output is turned into a string
// In this case, we want id to equal a number, so we have to use
// parseInt in variable declaration and in our 'find' code 13

// let's see what the params id is
// console.log(`request.params.id is ${request.params.id}`);
// this will print to terminal when I click on a robot's name 14

// let's test requestId 15
// again, click a <a> to log to console
// console.log(` This is the value of 'requestId': ${requestId}`);

// use 'find' to search our userDirectory.users array for the user with 16
// that ID. Eventually we will use a database for this
  const foundUser = userDirectory.users.find(user => user.id === requestId);

//
// Render (draw) the 'info' mustache template *USING* the 17
// 'foundUser' object
  response.render('info', foundUser);
});



// test to see we're linked to local host
// Testing to see if content is being pulled from mustache 7
// to local
app.get('/', (request, response) => {
  // response.send("Hello from JS land!") 2

  // response.render('home'); // 'home' is our mustache file 8

  // add userDirectory to sync data.js into home.mst
    response.render('home', userDirectory); // 9
});



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
