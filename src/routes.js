// Descrição: Configuração do servidor express
// O arquivo routes.js é responsável por configurar as rotas da aplicação.
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer.js';

import auth from './app/middlewares/auth.js';

// Importa o controller CustomersController
import customers from './app/controllers/CustomersController.js';
import contacts from './app/controllers/ContactsController.js';
import users from './app/controllers/UsersController.js';
import sessions from './app/controllers/SessionsController.js';
import files from './app/controllers/FilesController.js';

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/sessions", sessions.create)

routes.use(auth);

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

routes.get("/users/", users.index);
routes.get("/users/:id", users.show);
routes.post("/users/", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

routes.post("/files", upload.single("file"), files.create)

export default routes;