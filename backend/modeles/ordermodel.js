const mongoose = require("mongoose");
const orderShema = mongoose.Schema({
  shippinginfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
  },
  orderitems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: String,
        type: mongoose.Schema.ObjectId,
        ref: "products",
        required: true,
      },
    },
  ],
  user: {
   
    type: mongoose.Schema.ObjectId,
    ref: "users",     // collection pass 
    required: true,
  },
  paymentinfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paidat: {
      type: Date,
      required: true,
    },
    itmesprise: {
      type: Number,
      required: true,
    },
    textprise: {
      type: Number,
      required: true,
    },
    shippingprise: {
      type: Number,
      required: true,
    },
    tottalprise: {
      type: Number,
      required: true,
    },
  },
  orderstatus: {
    type: String,
    required: true,
    default: "processing",
  },
  deliverdate: Date,
  creatdate: {
    type: Date,
    default:Date.now() 
    
  },
});

const orderModel=mongoose.model("order",orderShema)
module.exports=orderModel