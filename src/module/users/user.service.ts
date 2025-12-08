import { pool } from "../../database/db";

// Get all vehicles
const getAllUsers = async () => {
  const result = await pool.query(`
    SELECT * FROM users`);
  return result;
};

//update vehicle
const updateUser = async (payload: Record<string, unknown>, id: string) => {
  const { name, email, password, phone, role } = payload;
  const result = await pool.query(
    `
    UPDATE users
    SET
      name = COALESCE($1, name),
      email = COALESCE($2, email),
      password = COALESCE($3, password),
      phone = COALESCE($4, phone),
      role = COALESCE($5, role)
    WHERE id = $6
    RETURNING *;
    `,
    [name, email, password, phone, role, id]
  );
  return result;
};

//delete vehicle
const deleteUser = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1
    `,
    [id]
  );
  return result;
};
export const userServices = {
  getAllUsers,
  updateUser,
  deleteUser,
};
