import Customer from '../models/Customer.js';
import Contact from '../models/Contact.js';
import { Op } from 'sequelize';
import { parseISO } from 'date-fns'

class CustomersController {
    // Rotas
    async index(req, res) {
        const {
            name,
            email,
            status,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let where = {};

        let order = [];

        if(name) {
            where = {
                ...where,
                name: {
                    [Op.like]: name,
                }
            }
        }

        if(email) {
            where = {
                ...where,
                email: {
                    [Op.like]: email,
                }
            }
        }

        if(status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status.split(",").map(item => item.toUpperCase()),
                }
            }
        }

        if(createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore),
                }
            }
        }
        
        if(createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter),
                }
            }
        }

        if(updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore),
                }
            }
        }
        
        if(updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter),
                }
            }
        }

        if(sort) {
            order = sort.split(",").map(item => item.split(":"));
        }

        console.log(where);

        const data = await Customer.findAll({
            where,
            include: [
                {
                    model: Contact,
                    attributes: ["id"],
                }
            ],
            order,
            limit,
            offset: limit * page - limit,
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