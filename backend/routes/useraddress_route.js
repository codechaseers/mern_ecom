const express = require("express");
const router = express.Router();
const { isAuthUser, authRole } = require("../middleware/auth");

const {addaddress,getaddress,deleteaddress}=require("../countrollers/useradress_control")


router.route("/addaddress").post(isAuthUser,addaddress);
router.route("/getaddress").post(isAuthUser,getaddress);
router.route("/deleteaddress").post(isAuthUser,deleteaddress);




module.exports=router