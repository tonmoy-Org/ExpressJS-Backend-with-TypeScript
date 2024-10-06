import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';

dotenv.config();

const app = express();

// middlewares
app.use(express.json());

// MongoDB connection using mongoose
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.mj9te36.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// routes
app.use('/api', productRoutes); 

export default app;
