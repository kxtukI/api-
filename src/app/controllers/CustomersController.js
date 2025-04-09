import Customer from '../models/Customer.js';
 
class CustomersController {
    // Rotas
    async index(req, res) {
        // Retorna a lista de clientes
        const data = await Customer.findAll({
            limit: 1000,
        });
        return res.json(data);
    }

    // Rota para buscar um cliente pelo id
    async show(req, res) {
        const id = parseInt(req.params.id);
        // Busca o cliente pelo id
        const customer = await Customer.findByPk(id);
        //  Verifica se o cliente foi encontrado
        const status = customer ? 200 : 404;
    
        // Retorna o cliente encontrado ou o status 404
        return res.status(status).json(customer);
    }

    // Rota para criar um novo cliente
    async create(req, res) {
        // Pega os dados do corpo da requisição
        const { name, email } = req.body;
        // Cria um novo cliente
        const newCustomer = await Customer.create({ name, email });

        // Retorna o novo cliente criado
        return res.status(201).json(newCustomer);
    }

    // Rota para atualizar um cliente
    async update(req, res) {
        // Pega o id do cliente a ser atualizado
        const id = parseInt(req.params.id);
        const { name, email } = req.body;

        const customer = await Customer.findByPk(id);
        const status = customer ? 200 : 404;

        // Verifica se o cliente    foi encontrado
        if (customer) {
            // Atualiza os dados do cliente
            await customer.update({ name, email });
        }

        return res.status(status).json(customer);
    }

    // Rota para deletar um cliente
    async destroy(req, res) {
        const id = parseInt(req.params.id);

        const customer = await Customer.findByPk(id);
        const status = customer ? 200 : 404;

        if (customer) {
            // Remove o cliente do banco de dados
            await customer.destroy();
        }

        return res.status(status).json();
    }
}

// Exporta uma instância da classe CustomersController
export default new CustomersController();