import Customer from '../models/Customer.js';
import Contact from '../models/Contact.js';
import { Op } from 'sequelize';
import { parseISO } from 'date-fns'
import * as Yup from 'yup';

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

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.like]: name,
                }
            }
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.like]: email,
                }
            }
        }

        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status.split(",").map(item => item.toUpperCase()),
                }
            }
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore),
                }
            }
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter),
                }
            }
        }

        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore),
                }
            }
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter),
                }
            }
        }

        if (sort) {
            order = sort.split(",").map(item => item.split(":"));
        }

        console.log(where);

        const data = await Customer.findAll({
            where,
            include: [
                {
                    model: Contact,
                    attributes: ["id", "status"],
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

        if (!customer) {
            return res.status(404).json();
        }
        return res.json(customer);
    }

    // Rota para criar um novo cliente
    async create(req, res) {
        // Pega os dados do corpo da requisição
        // Cria um novo cliente
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase()
        })

        schema.isValid(req.body);

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "error on validate schema" });
        }

        const customer = await Customer.create(req.body);

        // Retorna o novo cliente criado
        return res.json(customer);
    }

    // Rota para atualizar um cliente
    async update(req, res) {
        // Pega os dados do corpo da requisição
        // Cria um novo cliente
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase()
        })

        schema.isValid(req.body);

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "error on validate schema" });
        }

        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json();
        }
        await customer.update(req.body);

        // Retorna o cliente alterado
        return res.json(customer);
    }

    // Rota para deletar um cliente
    async destroy(req, res) {

        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            // Remove o cliente do banco de dados
            return res.status(404).json();
        }
        await customer.destroy();
        return res.json();
    }
}

// Exporta uma instância da classe CustomersController
export default new CustomersController();