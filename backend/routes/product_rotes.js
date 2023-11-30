// In project we use lot of api like get post put and many more for difrent type of opration so we creat separate route and separate controls and mersge them

// hear all the api routes

const express = require("express");
const router = express.Router();
const { isAuthUser, authRole } = require("../middleware/auth");

// require all api for product
const {
  getAllproducts,
  creatProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  creatReview,
  getReviews,
  deletReviews
} = require("../countrollers/product_controlars");

// creat route for all product api
router.route("/products").get(getAllproducts);
router
  .route("/admin/products/new")
  .post(isAuthUser, authRole("admin"), creatProduct);
router
  .route("/admin/products/update/:_id")
  .put(isAuthUser, authRole("admin"), updateProduct);
router
  .route("/admin/products/delete/:_id")
  .delete(isAuthUser, authRole("admin"), deleteProduct);
router.route("/products/find/:_id").get(getProduct);
router.route("/products/review").put(isAuthUser,creatReview);
router.route("/products/getreview").post(getReviews);
router.route("/products/deletreview").post(isAuthUser,deletReviews);

module.exports = router;
