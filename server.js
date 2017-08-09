const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const pgPromise = require('pg-promise')();
const db = pgPromise({ database: 'robotsDatabase' });
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

app.engine('mst', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mst');

app.use(express.static('public'));



app.get('/', (req, res) => {
	db.any('SELECT * FROM "robots"').then(robotdata => {
		res.render('home', { users: robotdata });
	});
});

app.get('/info/:id', (req, res) => {
	const id = req.params.id;
	db.one('SELECT * FROM "robots" WHERE id = $1', [id]).then(robotdata => {
		res.render('info', robotdata);
	});
});

app.get('/add', (req, res) => {
	res.render('addrobot');
});

app.post('/addId', (req, res) => {
// check for errors
  req
  .checkBody('username', 'Please enter a valid username.')
  .notEmpty();
  let errors = req.validationErrors();

  if(errors) {
    res.render('home', { errors });
  } else {
      const insertRobot = {
    		username: req.body.username,
    		email: req.body.email,
    		university: req.body.university,
    		job: req.body.job
    	};
    	db
    		.one(
    			`INSERT INTO "robots" (username, email, university, job)
        VALUES($(username), $(email), $(university), $(job)) RETURNING id`,
    			insertRobot
    		)
    		.then(insertRobotId => {
    			robot_id: insertRobotId.id;
    		})
    		.catch(error => {
    			console.log(error);
    		});
    	res.redirect('/');
    }
  });

app.listen(3000, () => {
	console.log('Our app is listening on port 3000!');
});
