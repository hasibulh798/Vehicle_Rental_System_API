import { Request, Response } from "express";
import { authServices } from "./auth.service";

// Sign up Controller
const signupController = async (req: Request, res: Response) => {
  const result = await authServices.signupUser(req.body);
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

// signin Controller
const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authServices.loginUser(email, password);
  const { password: string, ...userWithoutPassword } = result.user;
  try {
    res.status(200).json({
      success: true,
      message: "Login successfull",

      data: { token: result.token, user: userWithoutPassword },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  signupController,
  signinController,
};
