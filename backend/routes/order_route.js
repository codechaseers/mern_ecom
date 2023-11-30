const express = require("express");
const router = express.Router();
const { creatOrder, send, myOrder, getSingleOrder, getAllOrder, deletOrder, updateOrder } = require("../countrollers/order_controlars");
const { isAuthUser, authRole } = require("../middleware/auth");



router.route("/order").post(isAuthUser,creatOrder);
router.route("/myorders").get(isAuthUser,myOrder);
router.route("/admin/order/:id").get(isAuthUser,authRole("admin"),getSingleOrder);
router.route("/admin/orders/").get(isAuthUser,authRole("admin"),getAllOrder);
router.route("/admin/orders/delete/:id").delete(isAuthUser,authRole("admin"),deletOrder);
router.route("/admin/orders/update/:id").put(isAuthUser,authRole("admin"),updateOrder);
 
module.exports=router
 