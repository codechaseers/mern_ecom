const express = require("express");
const router = express.Router();

const {
  creatUser,
  loginUser,
  forgetPassword,
  resetPassword,
  getuserDitals,
  updatePassword,
  updateProfile,
  alluserDitals,
  singleuserDitals,
  updateRole,
  deleteUser,
 
} = require("../countrollers/user_controlars");
// const resetPassword=require('../countrollers/user_controlars')
const { logout } = require("../middleware/auth");
const { isAuthUser, authRole } = require("../middleware/auth");
const { deleteOne } = require("../modeles/usermodels");

router.route("/register").post(creatUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
 
router.route("/me").get(isAuthUser, getuserDitals);
router.route("/password/update").put(isAuthUser, updatePassword);
router.route("/profile/update").put(isAuthUser, updateProfile);
router.route("/admin/users").get(isAuthUser, authRole("admin"), alluserDitals);
router
  .route("/admin/user/:id")
  .get(isAuthUser, authRole("admin"), singleuserDitals);
router
  .route("/admin/profile/update")
  .post(isAuthUser, authRole("admin"), singleuserDitals);
router
  .route("/admin/user/update")
  .post(isAuthUser, authRole("admin"), updateRole);
router
  .route("/admin/user/delet/:id")
  .delete(isAuthUser, authRole("admin"), deleteUser);

module.exports = router;
