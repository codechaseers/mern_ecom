const { default: mongoose } = require("mongoose");
const monogoose = require("mongoose");

const productschema = new monogoose.Schema({
  name: {
    type: String,
    required: [true, "Pleade enter product name"],
  },
  description: {
    type: String,
    required: [true, "Pleade enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Pleade enter product price"],
    maxlength: [8, "price cannot be exiced 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      publicid: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: [true, "Pleade enter product stock"],
    maxlength: [4, "stock cannot be exiced 8 characters"],
    default: 1,
  },
  numofReviews: {
    type: String,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "usermodel",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "usermodel",
    required: true,
  },
  craeteDate: {
    type: Date,
    default: Date.now,
  },
});
const productModel = mongoose.model("products", productschema);
module.exports = productModel;
