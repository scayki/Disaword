// npm install express express-handlebars body-parser sequelize sqlite3

const express = require('express')
const { engine } = require('express-handlebars'); // novo jeito de importra handlebars

const path = require('path')
const app = express()
const db = require('./DB/connection.js')
const bodyParser = require('body-parser')
const Job = require('./models/Job')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
app.get('/', (req,res)=> {

    let search = req.query.job
    let query = '%' +search+ '%'


    if(!search){

    Job.findAll({order: [
        ['createdAt','DESC']
    ]})
    .then(jobs => {
        res.render('index', {
            jobs
        })
    })
    .catch(err=>console.log(err))
}else{
    Job.findAll({
        where: {title: {[Op.like]:query}},
        order: [
        ['createdAt','DESC']
    ]})
    .then(jobs =>{
        res.render('index', {
            jobs, search
        })
    })
    .catch(err=>console.log(err))
}

})

app.use('/jobs', require('./routes/jobs'))

