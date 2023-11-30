const mongoose = require("mongoose")
const addtocartShema = mongoose.Schema({

all_items:[{
    product_id:{
        type:String,
        require:true
    },
     product_Name:{
        type:String,
        require:true
    }, 
      product_Image:{
        type:String,
        require:true
    }, 
      product_Price:{
        type:Number,
        require:true
    }, 
   
}],


quantity:{
    type:Number,
    require:true
},
user:{
    type: mongoose.Schema.ObjectId,
    ref: "users",     // collection pass 
    required: true,
}


})
const  addtocartModel=mongoose.model("addtocart", addtocartShema)
module.exports=addtocartModel