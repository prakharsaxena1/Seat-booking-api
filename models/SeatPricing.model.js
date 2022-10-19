const mongoose = require("mongoose");

const SeatPricingSchema = new mongoose.Schema({
  id: { type: Number, required: [true, 'id is requred to create seat'] },
  seat_class: { type: String, required: [true, 'seat class required'] },
  price_min: { type: Number, default: 0 },
  price_max: { type: Number, default: 0 },
  price_normal: { type: Number, default: 0, required: true }
});

const SeatPricing = mongoose.model("SeatPricing", SeatPricingSchema);
module.export = {
    SeatPricing
}