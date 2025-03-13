// Descrição: Configuração do servidor express
// O arquivo routes.js é responsável por configurar as rotas da aplicação.
import { Router } from 'express';
// Importa o controller CustomersController
import customers from './app/controllers/CustomersController';

const routes = new Router();

// Adiciona as rotas para Customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

export default routes;