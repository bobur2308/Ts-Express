import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import cookieParser from 'cookie-parser'
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from './routes/UserRoutes'

dotenv.config();

const app: Application = express();

app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/auth", AuthRoutes);
app.use('/api/log', UserRoutes)

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
