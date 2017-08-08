const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const pgPromise = require('pg-promise')();
const db = pgPromise({ database : 'robotsDatabase'});
const bodyParser = require('body-parser');

app.engine('mst', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mst');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  db.any('SELECT * FROM "robots"').then(robotdata => {
    res.render('home', { users: robotdata });
  });
});

app.get('/info/:id', (req, res) => {
  const id = req.params.id;
  db.one('SELECT * FROM "robots" WHERE id = $1', [id])
  .then(robotdata => {
  res.render('info', robotdata)
})
  .catch(robotdata => {
    res.render('form', robotdata);
  });
});

app.post('/form', (req, res) => {
  const insertRobot = {
    username: req.body.username,
    email: req.body.email,
    university: req.body.university,
    job: req.body.job
  }
  db.one(`INSERT INTO "robots" (username, email, university, job)
    VALUES($(username), $(email), $(university), $(job)) RETURNING id`,
    insertRobot;
  )
    .then(insertRobotId => {
      robot_id: insertRobotId.id
  })
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Our app is listening on port 3000!');
});
