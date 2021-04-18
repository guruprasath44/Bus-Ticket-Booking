const express = require('express');
const bodyParser = require('body-parser');
//const db= require('./model/db.js');
const mongoose = require('mongoose');
const admin = require('./routes/admin');
const passenger = require('./routes/pass');
const ticket = require('./routes/ticket');
mongoose.Promise = global.Promise;

//database connection
require('dotenv').config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,useCreateIndex:true})
    const connection = mongoose.connection;
connection.once('open', () => {
console.log('Connected Database Successfully');
}).catch(err => {
        console.log('Database is not connected', err);
       process.exit();
     });

const app = express();
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept,Authorization");
        res.header('Access-Control-Allow-Methods','GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
        next();
    
});
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "Welcome "});
    console.log("Hi hello");
});
// app.get('/hi', (req, res) => {
//     res.json({"message": "Welcome  hi"});
//     console.log("Hi hello hi");
// });
app.use('/bus/admin', admin);
app.use('/bus/pass', passenger);
app.use('/bus/ticket', ticket);

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});