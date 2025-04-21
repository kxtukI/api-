// Descrição: Configuração do servidor express
// O arquivo routes.js é responsável por configurar as rotas da aplicação.
import { Router } from 'express';
// Importa o controller CustomersController
import customers from './app/controllers/CustomersController.js';
import contacts from './app/controllers/ContactsController.js';

const routes = new Router();

// Adiciona as rotas para Customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
routes.post("/customers/:customerId/contacts/", contacts.create);
routes.put("/customers/:customerId/contacts/:id", contacts.update);
routes.delete("/customers/:customerId/contacts/:id", contacts.destroy);

export default routes;