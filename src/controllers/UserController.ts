import { Request, Response } from "express";
import User from "../models/UserModels"; // Ensure correct import

class UserController {
    // Get all users
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    }

    // Get a single user by ID
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    }
}

export default new UserController(); // Export an instance of the class
