import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(
      req.body,
      req.user as JwtPayload
    );

    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: err.message,
    });
  }
};

//Get All vehicles
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();
    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: result.rows,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        errors: err.message,
      });
  }
};

//Get vehicle by id
const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehicleServices.getVehicleById(vehicleId as string);

    if (result.rows.length == 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: err.message,
    });
  }
};

//update vehicle
const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;

    const result = await vehicleServices.updateVehicle(
      req.body,
      vehicleId as string
    );
    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: err.message,
    });
  }
};

//Delete vehicle
const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;

    const result = await vehicleServices.deleteVehicle(vehicleId as string);
    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: err.message,
    });
  }
};
export const vehicleControllers = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
