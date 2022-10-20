const Seat = require('./../models/Seats.model');
const SeatPricing = require('../models/SeatPricing.model');
const Bookings = require('../models/Bookings.model');

const getAllSeats = async (req, res) => {
    const seats = await Seat.find({}, { _id: 0 }).sort({ seat_class: 1 });
    res.json({ data: seats })
}

const getSeatWithID = async (req, res) => {
    const seat = await Seat.findOne({ id: req.params.id }, { _id: 0 });
    const countSeatClass = await Seat.find({ seat_class: seat.seat_class }).count();
    const countSeatClassBooked = await Bookings.find({ seat_class: seat.seat_class }).count();
    const seatPricing = await SeatPricing.findOne({ seat_class: seat.seat_class });
    const bookedPercent = (countSeatClassBooked / countSeatClass);
    const data = {
        ...seat.toObject()
    };
    if (bookedPercent < 40) {
        data.price = seatPricing.min_price || seatPricing.normal_price;
    }
    else if (bookedPercent >= 40 && bookedPercent <= 60) {
        data.price = seatPricing.normal_price;
    }
    else {
        data.price = seatPricing.max_price || seatPricing.normal_price;
    }
    res.json({ data });
}

const createBooking = async (req, res) => {
    const { seatsArray } = req.body;
    // Will book all the seats I can from the array
    const dataArray = [];
    for (const booking in seatsArray) {
        const seat = await Seat.findOne({ id: seatsArray[booking].seat_id }, { _id: 0 });
        const seatBook = seatsArray[booking];
        if (seat.is_booked === false) {
            try {
                const user = await Bookings.create(seatBook);
                await Seat.findOneAndUpdate({ id: seatsArray[booking].seat_id }, { $set: { is_booked: true } });
                dataArray.push({ seat_id: user.seat_id, bookingID: user._id, message: "seat is booked" });
            } catch (err) {
                dataArray.push({ message: err.message });
            }
        } else {
            dataArray.push({ message: `Error can't book seat with id=${seatsArray[booking].seat_id} (reason: Already booked)` })
        }
    }
    res.json({ data: dataArray });
}

const getAllBookings = async (req, res) => {
    const { userIdentifier } = req.query;
    if (userIdentifier === ""){
        return res.status(400).json({message: "Error: userIdentifier not provided"})
    }
    const bookings = await Bookings.find({ $or: [{ email: userIdentifier }, { phone: userIdentifier }] });
    const dataArray = [];
    for (const booking of bookings) {
        dataArray.push({
            bookingID: booking._id,
            email: booking.email,
            phone: booking.phone
        })
    }
    res.json({ data: dataArray });
}

module.exports = {
    getAllSeats,
    getSeatWithID,
    createBooking,
    getAllBookings
}