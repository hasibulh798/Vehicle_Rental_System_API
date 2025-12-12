import { pool } from "../../database/db";

//Create bookings
export const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  if (!customer_id || !vehicle_id || !rent_start_date || !rent_end_date) {
    throw new Error("All field are required!");
  }

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

  const customerView = bookingResult.rows.map((booking, index) => {
    return {
      ...booking,
      vehicle: vehicles[index],
    };
  });

  return { adminView, customerView };
};

//update booking
export const updateBookings = async (
  body: Record<string, unknown>,
  bookingId: string,
  currentUser: Record<string, any>
) => {
  const { status } = body;

  // 1. Fetch booking details
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);
  if (bookingRes.rows.length === 0) throw new Error("Booking not found");

  const booking = bookingRes.rows[0];
  const vehicleId = booking.vehicle_id;

  // Role-based validation
  if (status === "cancelled") {
    if (currentUser.role !== "customer") {
      throw new Error("Only customers can cancel bookings");
    }
    if (booking.customer_id !== currentUser.id) {
      throw new Error("You can cancel only your own bookings");
    }
  }

  if (status === "returned") {
    if (currentUser.role !== "admin") {
      throw new Error("Only admin can mark booking as returned");
    }
  }

  // 2. Update booking status
  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingId]
  );

  // 3. If cancelled or returned → vehicle available
  if (status === "cancelled" || status === "returned") {
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [vehicleId]
    );
  }
  const vehicle = await pool.query(
    `SELECT availability_status FROM vehicles WHERE id=$1`,
    [vehicleId]
  );
  const updateResult = result.rows[0];
  const updateVehicle = vehicle.rows[0];
  return { updateResult, updateVehicle };
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  updateBookings,
};
