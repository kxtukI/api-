import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
import * as Yup from 'yup';

import Contact from '../models/Contact.js';
import Customer from '../models/Customer.js';

class ContactController {

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

        let where = { customer_id: req.params.customerId };

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
        const contact = await Contact.findAll({
            where,
            include: [
                {
                    model: Customer,
                    attributes: ["id", "status"]
                }
            ],
            order,
            limit,
            offset: limit * page - limit
        })
        return res.json(contact);
    }

    async show(req, res) {


        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id
            },
            attributes: { exclude: ["customer_id"] }
        })

        if (!contact) {
            return res.status(404).json();
        }

        return res.json(contact);
    }

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            status: Yup.string().uppercase(),
        })

        schema.isValid(req.body);

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "error on validate schema" });
        }

        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId
            }
        })

        if (!contact) {
            res.status(404).json();
        }

        await Contact.create({
            customer_id: req.params.customerId,
            ...req.body
        })

        return res.json(contact);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string(),
            status: Yup.string().uppercase(),
        })

        schema.isValid(req.body);

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "error on validate schema" });
        }

        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id
            }
        })

        if (!contact) {
            return res.status(404).json();
        }

        await contact.update(req.body);

        return res.json(contact);
    }

    async destroy(req, res) {

        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id
            }
        })

        if (!contact) {
            return res.status(404).json();
        }

        await contact.destroy(req.body);

        return res.json();
    }

}

export default new ContactController();