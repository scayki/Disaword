// npm install express express-handlebars body-parser sequelize sqlite3

const express = require('express')
const { engine } = require('express-handlebars'); // novo jeito de importra handlebars

const path = require('path')
const app = express()
const db = require('./DB/connection.js')
const bodyParser = require('body-parser')

const porta = 3000

//bodyparser
app.use(bodyParser.urlencoded({extended:false}))

//handlebars
app.set('views',path.join(__dirname, 'views'))
app.engine('handlebars', engine({ defaultLayout: 'main' })); //novo uso das handlebars
app.set('view engine','handlebars')

//static folder
app.use(express.static(path.join(__dirname, 'public')))

app.listen(porta, ()=> console.log(`o Express está rodando na porta ${porta} `))

//db connection
db
.authenticate()
.then( () => console.log("conectou ao banco com sucesso"))
.catch((err)=> console.log("ocorreu um erro ao conectar ",err))

//routes
app.get('/', (req,res)=> res.render('index'))

app.use('/jobs', require('./routes/jobs'))