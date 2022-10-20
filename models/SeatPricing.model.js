const mongoose = require("mongoose");

const SeatPricingSchema = new mongoose.Schema({
  id: { type: Number, required: [true, 'id is requred to create seat'] },
  seat_class: { type: String, required: [true, 'seat class required'] },
  min_price: { type: Number, default: 0 },
  max_price: { type: Number, default: 0 },
  normal_price: { type: Number, default: 0, required: true }
});

const SeatPricing = mongoose.model("SeatPricing", SeatPricingSchema);
module.exports = SeatPricing;