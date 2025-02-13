// types/express.d.ts

import { User } from "../src/models/UserModel";  // Adjust according to your actual User model

declare global {
  namespace Express {
    interface Request {
      user?: User;  // You can replace 'User' with your actual type if different
    }
  }
}
