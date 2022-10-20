const mongoose = require("mongoose");

const BookingsModel = new mongoose.Schema({
  seat_id: { type: Number, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  __v: { type: Number, select: false }
});

const Bookings = mongoose.model("Bookings", BookingsModel);
module.exports = Bookings;