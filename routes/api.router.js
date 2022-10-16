// Dependencies
const express = require("express");
const router = express.Router();
const apiController = require('../controllers/api.controller')

// Routes
router.route('/seats').get(apiController.getAllSeats);
router.route('/seats/:id').get(apiController.getSeatWithID);
router.route('/booking').post(apiController.createBooking);
router.route('/bookings').get(apiController.getAllBookings);

// Exports
module.exports = router;