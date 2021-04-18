const { Ticket } = require('../model/ticket');
const {Passenger}= require('../model/pass')
const ticketCreate = async(req,res)=>{
    try {
        if (parseInt(req.body.seatID) > 40) {
            return res.status(400).send("Invalid SeatID. There are only 40 seats in the Bus!");
        }

        let exists = await Ticket.findOne({
            isBooked: true,
            seatID: req.body.seatID
        });
        if (exists) {
            return res.status(400).send("The seat you are looking for is already booked");
        }
        const passenger = new Passenger(req.body.passenger);
        const passengerData = await passenger.save();

        if (passengerData) {
            const ticket = new Ticket()
            ticket.seatID = req.body.seatID
            ticket.passengerObj = passenger._id;
            const ticketData = await ticket.save();
            if (ticketData) {
                res.status(200).send(ticketData);
            }
        }
    } catch (err) {
        console.log("ERROR:: ", err)
        return res.status(403).send("Unknown Error!");
    }
}

const viewopen = async(req,res)=>{
    try {
        const data = await Ticket.find({
            
            isBooked: false
        });
        if(data == ''){
            return res.status(403).json({
                "message": "No seats are Booked"
            })
        }else{
        return res.status(200).send(data);
        }
    } catch {
        console.log("ERROR:: ", err)
        return res.status(403).send("Unknown Error!");
    }
}

const viewclosed = async(req,res)=>{
    try {
        const data = await Ticket.find({
            isBooked: true
        });
        if(data == ''){
            return res.status(403).json({
                "message": "No tickets were Booked"
            })
         } else{
        return res.status(200).send(data);
            }
    } catch {
        console.log("ERROR:: ", err)
        return res.status(403).send("Unknown Error!");
    }
}

const getticketId = async(req,res)=>{
    try {
        const { ticketId } = req.params;
        const ticketData = await Ticket.findById(ticketId);
        if (ticketData) {
            return res.status(200).json({
                isBooked: ticketData.isBooked
            });
        }
        else{
            return res.status(404).json({
                "message": "Ticket ID is incorrect!"
            })
        }
    } catch (err) {
        console.log("ERROR:: ", err)
        return res.status(403).send("Unknown Error!");
    }
}

const updateticketId =async (req,res)=>{
    try {
        const { ticketId } = req.params;
        const ticketData = await Ticket.findByIdAndUpdate(ticketId, {
            $set: { isBooked: req.body.isBooked }},
            {new: true}
        );
        if(!ticketData){
            return res.status(404).json({
                "message": "Ticket ID is incorrect!"
            })
        }
        const passengerId = ticketData.passengerObj
        await Passenger.findByIdAndUpdate(passengerId, 
            { $set: req.body.passenger }, 
            { new: true }, 
        );
        res.json({
            "message":"Successfully Updated Details!"
        })
    } catch (err) {
        console.log("ERROR:: ", err)
        return res.status(403).send("Unknown Error!");
    }
}
module.exports={
    ticketCreate,
    viewopen,
    viewclosed,
    getticketId,
    updateticketId
}