import { Router } from "express";
import UserContoller from "../controllers/UserContoller";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.get('/user/:id',authenticate,UserContoller.getUserData.bind(UserContoller))



export default router;