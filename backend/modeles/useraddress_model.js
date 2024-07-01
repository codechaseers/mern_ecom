const mongoose = require("mongoose")


const userAddressShema = mongoose.Schema({
all_address:[{
    city:{
        type:String,
        require:true
    }, 
     state:{
        type:String,
        require:true
    }, 
       country:{
        type:String,
        require:true
    }, 
       pin:{
        type:Number,
        require:true
    }, 
    mobile:{
        type:Number,
        require:true
    }, 
   
}], 
user:{
    type: mongoose.Schema.ObjectId,
    ref: "users",     // collection pass 
    required: true,
}


})
const  userAddressModel=mongoose.model("useraddress", userAddressShema)
module.exports=userAddressModel