import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", auth("admin", "user"), bookingController.createBooking);
router.get("/", bookingController.getAllBookings);

export const bookingRoutes = router;
