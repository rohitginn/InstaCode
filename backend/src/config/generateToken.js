import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });

