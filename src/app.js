// Descrição: Configuração do servidor express
// O arquivo app.js é responsável por configurar o servidor express e adicionar os middlewares e rotas.
import express  from 'express';
import routes  from './routes.js';

import "./database/index.js";

// Cria a classe App
// Essa classe é responsável por configurar o servidor express
// e adicionar os middlewares e rotas   
class App {
    constructor(){
        this.server = express();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;