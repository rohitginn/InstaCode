import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';
import { config } from 'dotenv';
config();

const authMiddleware = async (req, res, next) => {
    let token = req.cookies.jwt;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedToken.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }
            next();
        } catch (error) {
            console.error("Token verification error:", error.message);
            res.status(401).json({ message: "Invalid token" });
        }
    } else {
        res.status(401).json({ message: "Token not found" });
    }
};

export default authMiddleware;