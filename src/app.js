// Descrição: Configuração do servidor express
// O arquivo app.js é responsável por configurar o servidor express e adicionar os middlewares e rotas.
const express = require('express');
const routes = require('./routes');

// Cria a classe App
// Essa classe é responsável por configurar o servidor express
// e adicionar os middlewares e rotas   
class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

module.exports = new App().server;