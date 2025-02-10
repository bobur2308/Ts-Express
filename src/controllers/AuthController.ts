import { Request, Response } from "express";
import UserModel from "../models/UserModel"; // Ensure correct import
import jwt, { JwtPayload } from "jsonwebtoken";

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { userName, email, password } = req.body;
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        res.status(400).json({ message: "User already exist" });
        return;
      }
      const user = new UserModel({ userName, email, password });
      await user.save();
      res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required !" });
        return;
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "User not found !" });
        return;
      }

      if (password != user?.password) {
        res.status(400).json({ message: "Password is invalid !" });
        return;
      }
      const JWT_SECRET = process.env.JWT_SECRET as string;
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }

      // Generate tokens
      const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      // Set cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15, // 15 minutes
        sameSite: "strict",
        secure: false, // Change to `true` in production with HTTPS
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: "strict",
        secure: false,
      });

      res.status(200).json({
        message: "Login successfull !",
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        res.status(401).json({ message: "Refresh token is invalid" });
        return;
      }

      const JWT_SECRET = process.env.JWT_SECRET as string;
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }

      jwt.verify(refreshToken, JWT_SECRET, async (err:any, data: any) => {
        if (err) {
          console.log("Refresh Token Verification Error:", err);
          res
            .status(401)
            .json({ message: "Refresh token expired. Login again" });
          return;
        }

        const user = await UserModel.findById(data.userId);
        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }

        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
          expiresIn: "15m",
        });

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 15, // 15 minutes
          sameSite: "strict",
          secure: false, // Change to `true` in production with HTTPS
        });

        res.status(200).json({
          message: "Token refreshed",
          user,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  async logOut(req:Request,res:Response):Promise<void>{
    try {
      const refreshToken = req.cookies.refreshToken
      if(!refreshToken){
        res.status(401).json({message:"Refresh toke is invalid !"})
        return
      }
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')


      res.status(200).json({
        message:"User logged out successfully !"
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new AuthController();
