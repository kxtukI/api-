// Descrição: Configuração do servidor express
// O arquivo app.js é responsável por configurar o servidor express e adicionar os middlewares e rotas.
import 'dotenv/config'
import express from 'express';
import 'express-async-errors'
import Youch from 'youch'

import routes from './routes.js';

import "./database/index.js";

// Cria a classe App
// Essa classe é responsável por configurar o servidor express
// e adicionar os middlewares e rotas   
class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

    expectionHandler() {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === 'development') {
                const errors = await new Youch(err, req).toJSON();
                return res.status(500).json(errors);
            }

            return res.status(500).json({ error: 'Internal Server Error' })
        })
    }
}

export default new App().server;