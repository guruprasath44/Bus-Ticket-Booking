const { Passenger } = require('../model/pass');
const pass = async (req,res)=>{
    try {
        const { ticketId } = req.params;
        if (!ticketId) {
            return res.status(400).json({"message":"TicketID input is missing!"});
        }

        const ticketData = await Ticket.findById(ticketId);
        if (!ticketData) {
            return res.status(404).json({"message":"Ticket doesn't exist!"});
        }

        const passengerData = await Passenger.findById(ticketData.passengerObj);
        if (passengerData) {
            return res.status(200).send(passengerData);
        }

        return res.status(404).json("Passenger could not be found!")
    } catch (err) {
        console.log("ERROR:: ", err);
    }
}

module.exports={
    pass
}