# Seat-booking-api

- Added postman collection json file
- postman documentation online: https://documenter.getpostman.com/view/18040695/2s84DhX6ej

# APIs are: 
Get All Seats - GET api/seats
Get Seat pricing - GET api/seats/:id
Create Booking - POST api/booking
Retrieve Bookings - GET api/bookings?userIdentifier=email-or-phone

# Script for removing and adding data from csv file: loadCSVdata.js
To remove all data (empty collections)
    run command: node loadCSVdata.js empty_db

To add data from csv files
    run command: node loadCSVdata.js insert_db


# Docker commands
- run: sudo docker run --name app -p 4000:4000/tcp -d seat-booking-app
- log: sudo docker logs -f app

# Download image from dockerhub

https://hub.docker.com/r/prakhar1337/seat-book-app