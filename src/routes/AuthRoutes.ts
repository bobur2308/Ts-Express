import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post('/register',AuthController.register.bind(AuthController))

export default router;
