import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
import * as Yup from 'yup';

//import Queue from '../../lib/Queue.js';
import WelcomeEmailJob from '../jobs/WelcomeEmailJob.js';

import User from '../models/User.js';

class UsersController {
    async index(req, res) {
        const {
            name,
            email,
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

        const data = await User.findAll({
            attributes: { exclude: ['password', 'password_hash'] },
            where,
            order,
            limit,
            offset: limit * page - limit,
        });
        return res.json(data);
    }

    async show(req, res) {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ["password_hash"] },
        });

        if (!user) {
            return res.status(404).json();
        }

        return res.json(user);
    }

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            passwordConfirmation: Yup.string().when("password", (password, field) =>
                password ? field.required().oneOf([Yup.ref("password")]) : field
            )
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "error on validate schema" })
        }

        const { id, name, email, file_id, createdAt, updatedAt } = await User.create(req.body);

        //await Queue.add(WelcomeEmailJob.key, { email, name })

        return res.json({ id, name, email, file_id, createdAt, updatedAt });
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            file_id: Yup.number()
                .transform(value => (value === "" || value === null || value === undefined ? null : value))
                .nullable()
                .notRequired(),
            oldPassword: Yup.string().min(8),
            password: Yup.string().min(8)
                .when("oldPassword", {
                    is: (val) => !!val,
                    then: (schema) => schema.required(),
                    otherwise: (schema) => schema.strip() // remove se não for enviado
                }),
            passwordConfirmation: Yup.string()
                .when("oldPassword", {
                    is: (val) => !!val,
                    then: (schema) => schema.required().oneOf([Yup.ref("password")]),
                    otherwise: (schema) => schema.strip()
                })
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "error on validate schema" })
        }

        const user = await User.findByPk(req.params.id)

        if (!user) {
            return res.status(404).json();
        }

        const { oldPassword } = req.body;

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: "user password not match!" });
        }

        const { id, name, email, file_id, createdAt, updatedAt } = await user.update(req.body);

        return res.json({ id, name, email, file_id, createdAt, updatedAt });
    }

    async destroy(req, res) {
        const user = await User.findByPk(req.params.id)

        if (!user) {
            return res.status(404).json();
        }

        await user.destroy();

        return res.json();
    }

}

export default new UsersController();