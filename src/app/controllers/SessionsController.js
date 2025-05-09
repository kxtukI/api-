import jwt from "jsonwebtoken";
import User from "../models/User.js";

class SessionsController {
    async create(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: "Password does not match" });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id, 
                name, 
                email,
            },
            token: jwt.sign({ id }, "3907af2795927d34b33643646c38f0f5", {
                expiresIn: "7d",
            }),
        })
    }
}

export default new SessionsController();