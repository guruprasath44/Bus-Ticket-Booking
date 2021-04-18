const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    email : {
        type : String 
    },
    name : {
        type : String   
    },
    gender: {
        type : String   
    },
    age : {
        type : Number   
    },
});

module.exports = {
    Passenger: mongoose.model('passenger', passengerSchema),
}