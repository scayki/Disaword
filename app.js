// npm install express express-handlebars body-parser sequelize sqlite3

const express = require('express');
const { engine } = require('express-handlebars'); // novo jeito de importra handlebars
const path = require('path');
const app = express();
const db = require('./DB/connection.js');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Use a porta fornecida pelo Heroku ou a 3000 para desenvolvimento local
const PORT = process.env.PORT || 3000;

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

// handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({ defaultLayout: 'main' })); // novo uso das handlebars
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connection
db.authenticate()
  .then(() => console.log("Conectou ao banco com sucesso"))
  .catch((err) => console.log("Ocorreu um erro ao conectar ", err));

// routes
app.get('/', (req, res) => {
  let search = req.query.job;
  let query = '%' + search + '%';

  if (!search) {
    Job.findAll({
      order: [['createdAt', 'DESC']]
    })
      .then(jobs => {
        res.render('index', { jobs });
      })
      .catch(err => console.log(err));
  } else {
    Job.findAll({
      where: { title: { [Op.like]: query } },
      order: [['createdAt', 'DESC']]
    })
      .then(jobs => {
        res.render('index', { jobs, search });
      })
      .catch(err => console.log(err));
  }
});

app.use('/jobs', require('./routes/jobs'));

// Start server
app.listen(PORT, () => console.log(`O Express está rodando na porta ${PORT}`));
