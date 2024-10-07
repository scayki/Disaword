let express = require('express')
let = app = express()

app.get('/', function(req,res){
    res.send('primeira rota no Express')
})

app.get('/teste',function(req,res){
    res.send("Outro ai")
})

app.listen(3000,function(req,res){
    console.log("a porta 3000 esta funcionando")
    
})






