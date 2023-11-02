const {route}=require("express");


const blog_route=route();


const {authenticate}=require("../middleware/auth_middleware");


const {identify_role}=require("../middleware/identify_role_middleware");


const {plus_blog,change_blog,delete_blog,get_all_blog,liking_blog,commenting_blog}=require("../control/blog_control");


blog_route.post("/blogs",authenticate,identify_role(["User"]),plus_blog);


blog_route.patch("/blogs/:id",authenticate,identify_role(["User"]),change_blog);

blog_route.delete("/blogs/:id",authenticate,identify_role(["User"]),delete_blog);


blog_route.get("/blogs",authenticate,get_all_blog);

blog_route.patch("/blogs/:id/like",authenticate,identify_role(["User"]),liking_blog);


blog_route.patch("/blogs/:id/comment",authenticate,identify_role(["User"]),commenting_blog);


module.exports={blog_route};