import Router from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/signup", authController.signupController);
router.get("/login", authController.loginController);

export const authRoutes = router;
