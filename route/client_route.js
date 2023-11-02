const {route}=require("express");


const client_route=route();


const {authenticate}=require("../middleware/auth_middleware");


const {client_signup,client_login,client_logout}=require("../control/client_control");


client_route.post("/register",client_signup);


client_route.post("/login",client_login);


client_route.post("/logout",authenticate,client_logout);


module.exports={client_route};