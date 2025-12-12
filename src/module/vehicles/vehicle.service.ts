import { pool } from "../../database/db";

const createVehicle = async (
  payload: Record<string, unknown>,
  user: Record<string, any>
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  if (
    !vehicle_name ||
    !type ||
    !registration_number ||
    !daily_rent_price ||
    !availability_status
  ) {
    throw new Error("All field are required!");
  }

  const userRole = user.role;
  if (userRole !== "admin") {
    throw new Error("Admin only");
  }
  const result = await pool.query(
    `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

// Get all vehicles
const getAllVehicles = async () => {
  const result = await pool.query(`
    SELECT * FROM vehicles`);
  return result;
};

//Get Vehicle by ID
const getVehicleById = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM vehicles WHERE id=$1
    `,
    [id]
  );
  return result;
};

//update vehicle
const updateVehicle = async (payload: Record<string, unknown>, id: string) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
    UPDATE vehicles SET vehicle_name=COALESCE($1, vehicle_name), type=COALESCE($2, type), registration_number=COALESCE($3,registration_number), daily_rent_price=COALESCE($4,daily_rent_price), availability_status=COALESCE($5,availability_status) WHERE id=$6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );
  return result;
};

//delete vehicle
const deleteVehicle = async (id: string) => {
  const vehicle = await pool.query(
    `SELECT availability_status FROM vehicles WHERE id=$1`,
    [id]
  );

  if (vehicle.rowCount === 0) {
    throw new Error("Vehicle not found");
  }

  const status = vehicle.rows[0].availability_status;

  if (status !== "available") {
    throw new Error("Cannot delete.It is currently booked.");
  }
  const result = await pool.query(
    `
    DELETE FROM vehicles WHERE id=$1
    `,
    [id]
  );
  return result;
};
export const vehicleServices = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
