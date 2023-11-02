const { blog_model } = require("../model/blog_model");


const plus_blog = async (request, response) => {


  const {clientID,username,content,likes,comments,category,date,title} = request.body;


  try {


    const my_blog_app = new blog_model({clientID,username,content,likes,comments,title,category,date});


    await my_blog_app.save();


    response.status(200).send({ success: true, msg: "blog added" });


  } 
  
  
  catch (er) {


    response.status(400).send({ er: er.msg });


  }


};


const change_blog = async (request, response) => {


  const my_blog_app_Id = request.params.id;


  const update_app_details = request.body;


  const { clientID } = request.body;



  try {


    const item = await blog_model.findById(my_blog_app_Id); 


    if (item.clientID.equals(clientID)) {


      const my_blog_app = await blog_model.findByIdAndUpdate(my_blog_app_Id, update_app_details, {


        new: true,


      });


      response.status(200).send({ success: true, msg: "blog changed" });


    } 
    
    
    else {


      response.status(200).send({ success: true, msg: "blog does not change" });


    }


  } 
  
  
  catch (er) {


    response.status(400).send({ er: er.msg });


  }


};

const delete_blog = async (request, response) => {


  const my_blog_app_Id = request.params.id;


  const { clientID } = request.body;


  try {


    const item = await blog_model.findById(my_blog_app_Id);


    if (item.clientID.equals(clientID)) {


      let loviidovii = await blog_model.findByIdAndDelete(my_blog_app_Id);


      response.status(200).send({ success: true, msg: "delete blog" });


    } 
    
    
    else {


      response.status(200).send({ success: true, msg: "delete" });


    }


  } 
  
  
  catch (er) {


    response.status(400).send({ er: er.msg });


  }


};


const get_all_blog = async (request, response) => {


  console.log(request.query);


  let { title, category, order,date } = request.query;


  try {


    const my_filt = {};


    if (title) {


      my_filt.title = new RegExp(title, 'g');


    }


    if (category) {


      my_filt.category = new RegExp(category, 'g');


    }


    if (date) {


      my_filt.date = new Date(date);


    }



    const choose = {};


    if (order === 'asc') {


      choose.date = 1;


    } 
    
    
    else if (order === 'desc') {


      choose.date = -1;


    }



    const item = await blog_model.find(my_filt).sort(choose);


    response.status(200).send({


      success: true,

      item: item,


      msg: "get all data"


    });


  } 
  
  
  
  catch (er) {


    response.status(400).send({ er: er.msg });


  }


};


const liking_blog = async (request, response) => {


  const my_blog_app_Id = request.params.id;


try {


  const my_blog_app = await blog_model.findByIdAndUpdate(my_blog_app_Id, {$inc:{likes:1}},
    
    {


    new: true,



  })


  response.status(200).send({ success: true, msg: "liked",item:my_blog_app });

 
} 


catch (er) {


  response.status(400).send({ er: er.msg });


}


};



const commenting_blog = async (request, response) => {


  const my_blog_app_Id = request.params.id;


  const {username,content}=request.body;



  try {


    const my_blog_app = await blog_model.findByIdAndUpdate(my_blog_app_Id, {$push:{comments:{username,content}}}, {


      new: true,


    })


    response.status(200).send({ success: true, msg: "Comments available",item:my_blog_app });

   
  } 
  
  
  catch (er) {


    response.status(400).send({ er: er.msg });


  }


};



module.exports = { plus_blog,change_blog,delete_blog,get_all_blog,liking_blog,commenting_blog }
