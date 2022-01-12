const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res) =>{
    const {query} = url.parse(req.url,true);
    let data = '';

    console.log(`Dados recebidos da url ${req.url}\n`);
    console.log(`Dados enviado pelo método ${req.method}\n`);

    if(query){
        console.log("Dados do GET \n")
        console.log(JSON.stringify(query))
    }

    const urlInfo = req.url.replace("/","")
    const dataUrl = urlInfo.split('?')
    const file = path.join(__dirname,"pages",dataUrl[0]);

    if(fs.existsSync(file)){
        const page = fs.readFileSync(file)   
        res.write(page);
    }
    else{
        res.write("Não encontrado")
    }

    req.on('data', chunk => {
        data += chunk;
    })

    req.on('end', () => {
        console.log(data)
        if(data){
            console.log("\nDados do POST \n")
            console.log(data)
        }
        res.writeHead(200);
    })

    res.end();
});


server.listen(3000, () => {
    console.log('Rodando na porta 3000');
})