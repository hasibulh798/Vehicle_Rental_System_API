import Router from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/signup", authController.signupController);
router.get("/signin", authController.signinController);

export const authRoutes = router;
