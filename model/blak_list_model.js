const mongo=require("mongoose");


const blk_list_schema=mongo.Schema({


    token: {

        req: true,


        unique: true,


        type: String,
        
      },


},


{


    versionKey : false,


    timestamps :true


});



const blk_list_model=mongo.model("blacklist",blk_list_schema);



module.exports={blk_list_model};