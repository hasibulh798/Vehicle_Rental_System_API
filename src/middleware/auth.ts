import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { pool } from "../database/db";

const secret = config.secret;

const auth = (...roles: ("admin" | "user")[]) => {
  //['admin']
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      // throw new Error("You are not authorized");
      res.status(401).json({
        success: false,
        message: "You are not authorized",
      });
    }
    const decoded = jwt.verify(token as string, secret as string) as JwtPayload;
    const user = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
      `,
      [decoded.email]
    );
    if (user.rows.length === 0) {
      // throw new Error("User not found!");
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    req.user = decoded;
    if (roles.length && !roles.includes(decoded.role)) {
      // throw new Error("You are not authorized");
      res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }
    next();
  };
};

export default auth;
