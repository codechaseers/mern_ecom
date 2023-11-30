const express = require("express");
const router = express.Router();
const { isAuthUser, authRole } = require("../middleware/auth");

const {addtocart,getcartitems}=require("../countrollers/addtocart_controlr")


router.route("/addtocart").post(isAuthUser,addtocart);
router.route("/getcartitems").post(isAuthUser,getcartitems);



module.exports=router