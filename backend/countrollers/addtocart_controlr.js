const addtocart_model=require("../modeles/addtocartmodel")
const usermodel = require("../modeles/usermodels");


// creat the cart items for spacific users api

exports. addtocart= async (req,res,next)=>{
try {
    const cartitems=await addtocart_model.create({
        all_items:[{
            product_id:req.body.product_id,
            product_Name:req.body.product_Name,
            product_Image:req.body.product_Image,
            product_Price:req.body.product_Price
            
        }],
        quantity:req.body.quantity,
        
        user: req.user._id,
    })
    res.status(201).json({
        sucess: true,
        cartitems
    })
} catch (error) {
    console.log(error),
    res.status(500).json({
        sucess: false,
        message: error,
    })
}
}

// get all the cart items for spacific users 

exports. getcartitems= async (req,res,next)=>{
try {
    const items = await addtocart_model.find({user:req.body.user});
   
    if (!items) {
        res.status(404).json({
          sucess: false,
          message: "items not found",
        });
      } else {
        res.status(200).json({
          sucess: true,
          items,
        });
      }
} catch (error) {
    
}
}
exports.deleteCartItem = async (req, res, next) => {
  try {
    let item = await addtocart_model.findByIdAndDelete(req.body.id);
    if(item){
    res.status(200).json({
      status: true,
      item,
      message: "item removed sucessfuly",
    });
  }
  else{
    res.status(500).json({
      status: false,
  
      message: "item alredy deleted",
    }); 
  }
  } catch (error) {
    
    res.status(500).json({
      status: false,
      message: "item  not found",
    });
  }
};