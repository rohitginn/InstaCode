import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { config } from 'dotenv';
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';

config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}))

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);




app.use('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});