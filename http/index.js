const {createServer} = require("http")

let server = createServer((request,response)=>{
    response.writeHead(200,{"contenr-Type": "text/html"})
    response.write(`
        <h1> Hello world</h1>
        <p> Primeiro de node nerrr</p>
        `)
        response.end()
})

server.listen(5000)
console.log("ouvindo a porta 8000")

//GET - Solicita dados
// POST - Insere dados
// DELETE - paa deletar dados
// PUT - atualiza dados