const mongoose = require("mongoose");

const SeatModel = new mongoose.Schema({
  id: { type: Number, required: [true, 'id is requred to create seat'] },
  seat_identifier: { type: String, required: [true, 'seat identifier required'] },
  seat_class: { type: String, required: [true, 'seat class required'] },
  is_booked: {type: Boolean, default: false, }
});

const Seat = mongoose.model("Seat", SeatModel);
module.exports = {
  Seat
}