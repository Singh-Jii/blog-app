const mongo=require("mongoose");


const client_schema=mongo.Schema({


    username:{

        trim:true,
        
        type:String,
        
        req:true,

    },
        

    avatar:{
        
        type:String,
        
        trim:true,

        req:true,


    },

    email:{
        
        req:true,
        
        unique:true,


        type:String,
        
        trim:true,


    },


    password:{
        
        type:String,


        trim:true,
        

        req:true,
    
    },


    role: {

        type: String,


        default: "User",


        enum: ["Admin","User"],


        req: true,


    }


},


{


    versionKey:false,


    timestamps:true


})


const client_model=mongo.model("User",client_schema);


module.exports={client_model};