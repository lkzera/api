const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//Declarando Rotas
const  login = require('./routes/login');

//
app.use(bodyParser.json());

//Usando Rotas
app.use('/login',login);


//Export do app
module.exports = app;