require("dotenv").config();


const exp=require("express");


const my_cor=require("cors");


const {my_connect}=require("./db/db");


const {client_route}=require("./route/client_route");


const {blog_route}=require("./route/blog_route");


const application=exp();


application.use(exp.json());


application.use(my_cor());


application.get("/",async(request,response)=>{


    return response.status(200).send({msg:`Hi, this is the endpoint.`});


})


application.use("/",client_route);


application.use("/",blog_route);


application.all("*",async(request,response)=>{


    return response.status(404).send("Error");


})


application.listen(process.env.port,async()=>{



    try {


        await my_connect;


        console.log("database connected");


    }
    
    
    catch (er) {


        console.log(er.msg);


    }

    
    console.log(`port${process.env.port}`);


})