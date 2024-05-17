import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import emailRoutes from "./routes/emailRoutes.js"
import campaignRoutes from "./routes/campaignRoutes.js"
import analyticsRoutes from "./routes/analyticsRoutes.js"
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express()

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/build')))

dotenv.config();
connectDB();

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.use("/email", emailRoutes);
app.use("/campaign", campaignRoutes);
app.use("/analytics", analyticsRoutes);



