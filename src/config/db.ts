import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn:any = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB Connected to ",conn.connection.host);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
