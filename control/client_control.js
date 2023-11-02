const {client_model}=require("../model/client_model");


const {blk_list_model}=require("../model/blak_list_model");


require("dotenv").config();


const cryption=require("bcrypt");


const jot=require("jsonwebtoken");


const client_signup=async (request,response)=>{


    let {role,username,email,password,avatar}=request.body;


    try {


        let client=await client_model.findOne({email});


        if(client){

          
            return response.status(409).send({ "success":false,"er": "login again" });


        }
        
        const privacy = cryption.hashSync(password, 8);


        let new_client=new client_model({email,password:privacy,avatar,role,username});


        console.log(new_client);


        await new_client.save();


        response.status(200).send({ "success": true, "msg": "client registration completed"});


    } 
    
    
    catch (er) {


        response.status(400).send({"er":er.msg});


    }


}



const client_login = async (request, response) => {


    let { email, password } = request.body;

  
    try {


      const client = await client_model.findOne({ email });


      if (!client) {


        return response.status(401).send({ success: false, er: 'wrong credential' });


      }
  

      cryption.compare(password, client.password, function (er, output) {

        
        if (er) {


          return response.status(500).send({ success: false, er: 'er' });


        }

  
        if (output) {


          const token = jot.sign({ clientID: client._id, role: client.role }, process.env.at, { expiresIn: '5d' });


          return response.status(200).send({ success: true, msg: 'Login Completed', token: token });


        } 
        
        
        else {



          return response.status(401).send({ success: false, er: 'wrong credential' });


        }


      });


    } 
    
    
    catch (er) {



      return response.status(500).send({ success: false, er: 'er' });


    }



  };



const client_logout=async (request,response)=>{


    let token=request.headers.token;


    try {


        const blk_list_token = new blk_list_model({ token });


        await blk_list_token.save();


        return response.status(200).send({success:false,msg:'logout completed'});


    } 
    
    
    catch (er) {


        response.status(400).send({"er":er.msg});


    }


}



module.exports={client_signup,client_login,client_logout};