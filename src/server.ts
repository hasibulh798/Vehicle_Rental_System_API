import express, { Request, Response } from "express";
import { initDB } from "./database/db";
import { authRoutes } from "./module/auth/auth.route";
const app = express();

const port = 5000;

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
// app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
