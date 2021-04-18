const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
       
    },
    password: {
        type : String, 
        required:true,
        
    },
    isAdmin: {
        type: Boolean,
        required:true,
    }
    
});

module.exports = {
    Admin: mongoose.model('admin', adminSchema),
}