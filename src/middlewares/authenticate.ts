import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Request to include user property
interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

const authenticate = async (req: AuthRequest,res: Response,next: NextFunction): Promise<void> => {
  const token = req.cookies?.accessToken;

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Store user data in request object
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default authenticate;
