const express = require("express");
const router = express.Router();
const { isAuthUser, authRole } = require("../middleware/auth");

const {addtocart,getcartitems,deleteCartItem}=require("../countrollers/addtocart_controlr")


router.route("/addtocart").post(isAuthUser,addtocart);
router.route("/getcartitems").post(isAuthUser,getcartitems);
router.route("/removeitem").post(isAuthUser,deleteCartItem);




module.exports=router