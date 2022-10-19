const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, default: "" },
  phone: { type: String, default: "" }
});

const BookingsModel = new mongoose.Schema({
  seat_id: { type: Number, required: true },
  user: userSchema
});

const Bookings = mongoose.model("Bookings", BookingsModel);
module.exports = {
  Bookings
}