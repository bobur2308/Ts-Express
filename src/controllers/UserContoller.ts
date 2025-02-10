import { Request, Response } from "express";
import UserModel from "../models/UserModel"; // Ensure correct import
import jwt, { JwtPayload } from "jsonwebtoken";


class UserController{
  async getUserData(req:Request,res:Response):Promise<void>{
    try {
      const id = req.params.id
      const reqUser:any = req.user
      if(!id){
        res.status(400).json({message:"Id not found !"})
        return
      }

      const user = await UserModel.findById(id)
      if(!user){
        res.status(400).json({message:"User not found !"})
        return
      }

      res.status(200).json({
        message:"success",
        data:user
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new UserController()