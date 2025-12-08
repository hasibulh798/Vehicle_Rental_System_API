import { pool } from "../../database/db";

//Create bookings
export const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleResult = await pool.query(
    `SELECT vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );
  if (vehicleResult.rows.length === 0) throw new Error("Vehicle not found");

  const vehicle = vehicleResult.rows[0];
  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle not available");
  }

  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);
  const number_of_days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const total_price = vehicle.daily_rent_price * number_of_days;

  const bookingResult = await pool.query(
    `INSERT INTO bookings
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1,$2,$3,$4,$5,'active') RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  // 4. Update vehicle status
  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  const booking = bookingResult.rows[0];
  booking.vehicle = {
    vehicle_name: vehicle.vehicle_name,
    daily_rent_price: vehicle.daily_rent_price,
  };

  return booking;
};

//get All bookings
export const getAllBookings = async (user: any) => {
  const bookingResult = await pool.query(`
      SELECT * FROM bookings`);

  //customer
  const customers = await Promise.all(
    bookingResult.rows.map(async (booking) => {
      const innerCustomer = await pool.query(
        `SELECT name, email FROM users WHERE id=$1`,
        [booking.customer_id]
      );
      return innerCustomer.rows[0];
    })
  );
  // console.log(customers);

  const merged = bookingResult.rows.map((booking, index) => {
    return {
      ...booking,
      customer: customers[index],
    };
  });

  const vehicles = await Promise.all(
    bookingResult.rows.map(async (booking) => {
      const innerVehicle = await pool.query(
        `SELECT vehicle_name, registration_number,type FROM vehicles WHERE id=$1`,
        [booking.vehicle_id]
      );
      return innerVehicle.rows[0];
    })
  );
  const withoutTypeVehicle = vehicles.map(({ type, ...rest }) => rest);

  const adminView = merged.map((booking, index) => {
    return {
      ...booking,
      vehicle: withoutTypeVehicle[index],
    };
  });
  console.log(adminView);
  const customerView = bookingResult.rows.map((booking, index) => {
    return {
      ...booking,
      vehicle: vehicles[index],
    };
  });
  console.log(customerView);

  return  { adminView, customerView };
};

export const bookingServices = {
  createBooking,
  getAllBookings,
};
