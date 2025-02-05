import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import AuthRoutes from "./routes/AuthRoutes";
import cookieParser from 'cookie-parser'

dotenv.config();

const app: Application = express();

app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/auth", AuthRoutes);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
