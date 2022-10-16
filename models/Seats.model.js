const mongoose = require("mongoose");

const SeatModel = new mongoose.Schema({
  id: Number,
  seat_identifier: String,
  seat_class: String,
  is_booked: Boolean
});

const Seat = mongoose.model("Seat", SeatModel);
