require("dotenv").config();


const mongo=require("mongoose");


const my_connect=mongo.connect(process.env.mongo_link);


module.exports={my_connect};