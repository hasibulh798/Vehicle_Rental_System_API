import { pool } from "../../database/db";

// Get all user
const getAllUsers = async () => {
  const result = await pool.query(`
    SELECT id, name,email, phone, role FROM users`);
  return result;
};

//update user
const updateUser = async (
  payload: Record<string, unknown>,
  id: string,
  currentUser: Record<string, any>
) => {
  const { name, email, password, phone, role } = payload;

  if (currentUser.role !== "admin") {
    if (currentUser.id !== Number(id)) {
      throw new Error("You can update only your own profile");
    }

    if (role) {
      throw new Error("You are not allowed to change role");
    }
  }

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

//delete user
const deleteUser = async (id: string) => {
  const booking = await pool.query(
    `SELECT id FROM bookings WHERE customer_id=$1`,
    [id]
  );

  if (booking.rowCount !== 0) {
    throw new Error("user not delete");
  }
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
