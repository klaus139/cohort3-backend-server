import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import connectDB from './config/db.js';

//initialize database
connectDB();

const app = express();

const PORT = process.env.PORTNUMBER;

//middlewares
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

//define the routes
app.use('/api/auth',authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/upload', uploadRoutes);

//upload routes
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads')))


app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))
