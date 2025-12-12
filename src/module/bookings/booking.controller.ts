import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingResult = await bookingServices.createBooking(req.body);

    const formatDate = (dateStr: string) => {
      return new Date(dateStr).toISOString().split("T")[0];
    };
    bookingResult.rent_start_date = formatDate(bookingResult.rent_start_date);
    bookingResult.rent_end_date = formatDate(bookingResult.rent_end_date);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: bookingResult,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: err.message,
    });
  }
};

//get all bookings
const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getAllBookings(req.user);
    console.log(result.customerView);
    console.log("User in req.user:", req.user);

    if (req.user?.role == "admin") {
      return res.status(200).json({
        success: true,
        message: "Bookings retrieved successfully",
        data: result.adminView,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Bookings retrieved successfully",
        data: result.customerView,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: err.message,
    });
  }
};

//update booking
const updateBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.updateBookings(
      req.body,
      req.params.bookingId as string,
      req.user as Record<string, any>
    );
    if (req.user?.role === "customer") {
      res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: result.updateResult,
      });
    }
    if (req.user?.role === "admin") {
      res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: { ...result.updateResult, vehicle: result.updateVehicle },
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: err.message,
    });
  }
};
export const bookingController = {
  createBooking,
  getAllBookings,
  updateBookings,
};
