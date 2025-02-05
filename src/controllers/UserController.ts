import { Request, Response } from "express";
import UserModel from "../models/UserModel"; // Ensure correct import

class UserController {
  // Get all users
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  // Get a single user by ID
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({user});
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
  async createUser(req:Request, res:Response):Promise<void>{
    try{
      const {userName, email, password} = req.body
      const userExist = await UserModel.findOne({email});
      if(userExist){
        res.status(400).json({message:"User already exist"});
        return;
      }
      const user = new UserModel({userName,email,password});
      await user.save();
      res.status(201).json({
        message:"User created successfully",
        user
      });
    }catch(error){
      res.status(500).json({message:"Server error"});
    }
  }
}

export default new UserController(); // Export an instance of the class
