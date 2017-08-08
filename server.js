const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const pgPromise = require('pg-promise')();
const db = pgPromise({ database : 'robotsDatabase'});

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
  db.one('SELECT * FROM "robots" WHERE id = $1', [id])

  .then(robotdata => {
  res.render('info', robotdata)
})
  .catch(robotdata => {
    res.render('form', robotdata);
  });
});

app.listen(3000, () => {
  console.log('Our app is listening on port 3000!');
});
