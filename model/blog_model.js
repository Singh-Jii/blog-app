const mongo = require('mongoose');


const my_schema = new mongo.Schema({


  username: { 
    
    type: String, 
    
    trim: true 
  
  },


  content: { 
    
    type: String, 
    
    trim: true 
  
  }


});


const right_types = ["Business","Lifestyle","Entertainment","Tech"];


const blog_schema = new mongo.Schema({


  clientID: { 
    
    ref: 'User', 


    type: mongo.Schema.Types.ObjectId, 
    
     
    req: true 
  
  
  },


  title: { 
    

    req: true, 


    type: String, 
    
    trim: true 
  
  
  },


  content: { 
    

    trim: true ,


    type: String, 
    
    req: true, 
    
  
  },


  category: { 
    
    type: String, 
    

    enum: right_types ,
  
  
    req: true, 
    
    
    trim: true, 

    
  },



  date: { 
    

    trim: true ,

    type: Date, 
    
    
    req: true, 
  
  
  },



  likes: { 
    
    trim: true, 
    
    default: 0,
    
    
    type: Number, 
    
    req: true, 
  
  
  },


  comments: [my_schema]



});


const blog_model = mongo.model('Blog', blog_schema);


module.exports = { blog_model };