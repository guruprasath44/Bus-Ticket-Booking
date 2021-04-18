const { Admin } = require('../model/admin');
const { Ticket } = require('../model/ticket');
const {Passenger}= require('../model/pass');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const adminLogin = async(req,res)=>{
    try {
        const admin = await Admin.findOne({
            email: req.body.email
        });
        if (!admin) {
            return res.status(404).send("Invalid Email!");
        }

        const passwordVerify = await bcrypt.compare(req.body.password, admin.password);
        if (!passwordVerify) {
            return res.status(404).send("Incorrect Password!");
        }

        const token = jwt.sign({
            _id: admin._id,
            isAdmin: admin.isAdmin
        }, "jwtPrivateKey");

        return res.header('x-auth-header', token)
            .status(200)
            .json({"message":"Login Successful!"});
    } catch (err) {
        console.log("ERROR:: ", err);
    }
}

const adminreset =  async ( req ,res) =>{
    try {
        await Ticket.deleteMany({}, {
            // $set: {
            //     isBooked: false
            // }
            
        });
        await Passenger.deleteMany({}, {
            // $set: {
            //     isBooked: false
            // }
        });
        return res.status(200).json({
            "message":"Successfully Reset all seats!"
        });
    } catch (err) {
        console.log("ERROR:: ", err)
    }
}

module.exports={
    
    adminLogin,
    adminreset
}