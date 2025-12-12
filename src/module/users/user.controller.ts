import { Request, Response } from "express";
import { userServices } from "./user.service";

//get all user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

// update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.updateUser(
      req.body,
      userId as string,
      req.user as Record<string, any>
    );

    const { password, ...userWithoutPassword } = result.rows[0];

    if (userId !== result.rows[0].id && result.rows.length == 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Users upadated successfully",
      data: userWithoutPassword,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

//delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const result = await userServices.deleteUser(userId as string);
    return res.status(200).json({
      success: true,
      message: "Users deleted successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};
export const userController = {
  getAllUsers,
  updateUser,
  deleteUser,
};
