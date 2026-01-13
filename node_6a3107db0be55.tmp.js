// Modulos
const bodyParser = require('body-parser')
const express = require('express')
const conexao = require('./database/banco_dados')
const formulario = require('./database/tabela_form')
const app = express()
// Modulos

app.set('view engine', 'ejs') // Configura o EJS como mecanismo de renderização de templates.
app.use(express.static('public')) // Define a pasta public para servir arquivos estáticos.
app.use(bodyParser.urlencoded({extended: false})) // Processa dados de formulários HTML
app.use(bodyParser.json()) // Processa dados JSON enviados nas requisições.

//conectando no banco de dados
conexao
    .authenticate()
    .then(() => {
        console.log('conexao feita com sucesso')
    })
    .catch((msgerro) => {
        console.log(msgerro)
    })
//conectando no banco de dados

// Criando rotas
app.get('/', (req, res) => {
    formulario.findAll({raw: true}).then(dados_formulario => {
        res.render('index', {
            dados_formulario: dados_formulario
        })
    })
})

app.get('/contato', (req, res) => {
    res.render('contato')
})

app.get('/agradecimento', (req, res) => {
    res.render('agradecimento')
})

app.post('/salvardados', (req, res) => {
    const {nome, email, mensagem} = req.body
    
    formulario.create({ nome, email, mensagem })
    .then(() => {res.redirect('/agradecimento')})
})
// Criando rotas

// Criando servidor local
app.listen(8000, function(error){
    if(error){
        console.log('Ops, algo deu errado')
    }

    else{
        console.log('Servidor iniciado com sucesso...')
    }
})
// Criando servidor local