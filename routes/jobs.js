const express = require('express')
const router = express.Router()
const job = require('../models/Job')

router.get('/test',(req,res)=>{
    res.send('deu certo')
})

// detalhe da vaga 
router.get('/view/:id', (req,res) =>job.findOne({
    where:{id: req.params.id}
})
.then(job=>{
    res.render('view',{
        job
    })
}).catch(err =>console.log(err))
)

router.get('/add',(req,res)=>res.render('add'))

router.post('/add', (req,res)=>{

    let {title, salary, company, description,email,new_job}= req.body
    job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(()=> res.redirect('/'))
    .catch( err => console.log(err))
})

module.exports = router