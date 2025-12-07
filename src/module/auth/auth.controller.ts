import { Request, Response } from "express";
import { authServices } from "./auth.service";

// Sign up Controller
const signupController = async (req: Request, res: Response) => {
  const result = await authServices.signupService(req.body);
  const { password, ...userWithoutPassword } = result.rows[0];
  try {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Server internal error!",
    });
  }
};

// Login Controller
const loginController = async (req: Request, res: Response) => {};

export const authController = {
  signupController,
  loginController,
};
