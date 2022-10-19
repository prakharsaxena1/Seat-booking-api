// Script to load all the seats from an csv file to db: To be run separately
require('dotenv').config({ path: __dirname + '/bin/test.env' })
const mongoose = require("mongoose");
const csv = require('csvtojson')
// models
const { Seat } = require('./models/Seats.model');
const { SeatPricing } = require('./models/SeatPricing.model');

const DB = process.env.DATABASE;
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection success."))
    .catch((error) => console.log(error));

const doWhat = process.argv[2];

const seatsInsert = (jsonObj) => {
    // MongoDB insertMany
    Seat.insertMany(jsonObj).then(() => {
        console.log("Data inserted in 'Seats'")
    }).catch((error) => {
        console.log(error)
    });

}
const SeatPricingInsert = (jsonObj) => {
    const seatsJSON_Array = [];
    for (const i of jsonObj) {
        const temp = {};
        for (const key in i) {
            if (key === "min_price" || key === "normal_price" || key === "max_price") {
                if (i[key] !== "") {
                    temp[key] = parseFloat(i[key].slice(1));
                    continue;
                }
            }
            temp[key] = i[key];
        }
        seatsJSON_Array.push(temp);
    }
    // MongoDB insertMany
    SeatPricing.insertMany(seatsJSON_Array).then(() => {
        console.log("Data inserted in 'SeatPricings'")
    }).catch((error) => {
        console.log(error)
    });
}

if (doWhat === "empty_db") {
    // Empty the db
    Seat.deleteMany({}, () => {
        console.log("deleted all from 'Seats'");
    });
    SeatPricing.deleteMany({}, () => {
        console.log("deleted all from 'SeatPricings'");
    });
} else if (doWhat === "insert_db") {
    const seatsPath = `${__dirname}/csv_data/Seats.csv`;
    const seatsPricePath = `${__dirname}/csv_data/SeatPricing.csv`;
    // for importing Seats
    csv({ colParser: { "id": "number" }, checkType: true }).fromFile(seatsPath).then(seatsInsert);
    // for importing SeatPricing
    csv().fromFile(seatsPricePath).then(SeatPricingInsert);
} else{
    console.log("Invalid argument passed");
    mongoose.disconnect(()=>{console.log("DB disconnected")})
}
