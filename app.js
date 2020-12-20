const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//Declarando Rotas
const  login = require('./routes/login');
const produtos = require('./routes//produtos');

//
app.use(bodyParser.json());

//Usando Rotas
app.use('/login',login);
app.use('/produtos',produtos);


//Export do app
module.exports = app;