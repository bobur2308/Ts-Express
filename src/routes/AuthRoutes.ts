import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post('/register',AuthController.register.bind(AuthController))
router.post('/login',AuthController.login.bind(AuthController))
router.post('/refresh',AuthController.refresh.bind(AuthController))
router.post('/logout',AuthController.logOut.bind(AuthController))


export default router;
