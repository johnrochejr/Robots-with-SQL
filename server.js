const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const userDirectory = require('./data');
const pgPromise = require('pg-promise')();
const database = pgPromise({ database : 'robotsDatabase'})

app.engine('mst', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mst');

app.use(express.static('public'));

app.get('/', (request, response) => {
  database.any('SELECT * FROM "robots" ').then(robotdata => {
    response.render('home', { users: robotdata });
  })
});

app.get('/info/:id', (request, response) => {
  const requestId = parseInt(request.params.id);
  const foundUser = userDirectory.users.find(user => user.id === requestId);
  response.render('info', foundUser);
});

app.listen(3000, () => {
  console.log('Our app is listening on port 3000!');
});







































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
