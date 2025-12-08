import express, { Request, Response } from "express";
import { config } from "./config";
import { initDB } from "./database/db";
import { authRoutes } from "./module/auth/auth.route";
import { bookingRoutes } from "./module/bookings/booking.route";
import { userRoutes } from "./module/users/user.route";
import { vehicleRoutes } from "./module/vehicles/vehicle.route";

const app = express();

const port = config.port;

// parser
app.use(express.json());

// DB connection
initDB();

//Test route
app.get("/", (req: Request, res: Response) => {
  console.log("Hello from the root route");
  res.status(200).json({
    message: "This is the root route",
    path: req.path,
  });
});

//AUTH
app.use("/api/v1/auth", authRoutes);

//User
app.use("/api/v1/users", userRoutes);

//Vehicle
app.use("/api/v1/vehicles", vehicleRoutes);

//Bookings
app.use("/api/v1/bookings", bookingRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
