import { prisma } from "../prisma/prisma-client.js";
import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const user = await prisma.user.findUnique({
            where: { 
                id: decoded.id,
            },
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized" });
    }
};