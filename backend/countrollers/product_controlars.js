// In project we use lot of api like get post put and many more for difrent type of opration so we creat separate route and separate controls and mersge them
// hear all the api controls

// const { findByIdAndUpdate } = require("../modeles/productmodles")
const productmodle = require("../modeles/productmodles");
const Apifeatures = require("../utils/apifeatures");

// --------------------- CREAT PRODUCT --ADMIN -----------------

const creatProduct = async (req, res, next) => {
  try {
    // adding login user id to product user shema user filed for identtify which admin creat
    req.body.user = req.user.id;
    const product = await productmodle.create(req.body);
    res.status(201).json({
      sucess: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS  WITH FILTER AND SEARCH

const getAllproducts = async (req, res) => {
  let result_per_page = 8;
  const productCount = await productmodle.countDocuments();

  // serach class empliment
  const apifeatures = new Apifeatures(productmodle.find(), req.query)
 
    .serach()
    .filter()
    .pageination(result_per_page)
     
  const allproducts = await apifeatures.query;
  // console.log(allproducts)

  res.status(200).json({
    status: true,
    allproducts,
    productCount,
    result_per_page ,
  });
};

// UPDATE PRODUCT --ADMIN

const updateProduct = async (req, res, next) => {
  try {
    let product = await productmodle.updateOne(req.params, {
      $set: req.body,
    });
    res.status(200).json({
      status: true,
      product,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: false,
      message: "product not found",
    });
  }
};

//DELETE PRODUCT -- ADMIN

const deleteProduct = async (req, res, next) => {
  try {
    let product = await productmodle.deleteOne(req.params);
    res.status(200).json({
      status: true,
      product,
      message: "product deleted sucessfuly",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: false,
      message: "product not found",
    });
  }
};

// GET DATA FORM SPACIFIC ID   --ADMIN

const getProduct = async (req, res) => {
  try {
    let product = await productmodle.find(req.params);
    res.status(200).json({
      status: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "product not found",
    });
  }
};

//Add a new review or update the old review

exports.creatReview = async (req, res) => {
  try {
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };

    const product = await productmodle.findById(req.body.id);
    // console.log(product);

    //hear we check a user's previous review exit or not  rev.user is review user (we can also use foreach)

    const isreviewed = await product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isreviewed) {
      //let find the user's that previous review and chyage it new review

      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = review.rating;
          rev.comment = review.comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numofReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.numofReviews;
    // rating = avg of total review (all rating / total review)
    await product.save({ validateBeforeSave: false });
    // console.log(product.ratings);

    res.status(200).json({
      status: true,
      message: "review added",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: error.name,
    });
  }
};

//Get product reviews

exports.getReviews = async (req, res) => {
  try {
    const product = await productmodle.findById(req.query.productid);

    res.status(200).json({
      status: true,
      review: product.reviews,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      status: false,
      message: "product not found",
    });
  }
};

// Delet review

exports.deletReviews = async (req, res) => {
  try {
    const product = await productmodle.findById(req.query.productid);
    const isreviewed = await product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isreviewed) {
      //let find the user's that previous review and chyage it new review

      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          product.reviews.pop(rev);
          product.numofReviews = product.reviews.length;
        }
      });
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.numofReviews;
    // rating = avg of total review (all rating / total review)
    await product.save();
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: " review not found",
    });
  }
};

module.exports.getAllproducts = getAllproducts;
module.exports.creatProduct = creatProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getProduct = getProduct;
