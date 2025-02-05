import { Request, Response } from "express";
import UserModel from "../models/UserModel"; // Ensure correct import

class AuthController {
  async register(req:Request, res:Response):Promise<void>{
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
      console.error(error)
      res.status(500).json({message:"Server error"});
    }
  }
  async login(req:Request,res:Response):Promise<void>{
    try {
      const {email,password} = req.body
      if(!email || !password){
        res.status(404).json({message:"User not found !"})
      }
      const user = await UserModel.findOne({email})


      res.status(200).json({
        message:"Login successfull !"
        user
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({message:"Server error"});
    }
  }
}

export default new AuthController(); 
