import bcrypt from "bcrypt";
import { pool } from "../../database/db";

const signupService = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashPassword = await bcrypt.hash(password as string, 12);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashPassword, phone, role]
  );
  return result;
};

export const authServices = {
  signupService,
};
