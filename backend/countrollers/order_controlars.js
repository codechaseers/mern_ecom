const orderModel = require("../modeles/ordermodel");
const productmodle = require("../modeles/productmodles");
const usermodel = require("../modeles/usermodels");

// creat an order
exports.creatOrder = async (req, res) => {
  try {
    const orderdata = await orderModel.create({
      shippinginfo: req.body.shippinginfo,
      orderitems: req.body.orderitems,
      paymentinfo: {
        id: req.body.id,
        status: req.body.status,
        itmesprise: req.body.itmesprise,
        textprise: req.body.textprise,
        shippingprise: req.body.shippingprise,
        tottalprise: req.body.tottalprise,
        paidat: Date.now(),
      },

      user: req.user._id,
    });
    res.status(200).json({
      sucess: true,
      orderdata,
      message: "order done",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      message: error,
    });
  }
};

//Get a single order (--- ADMIN )
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name email");
    // populate is a method it is find the name email form user collection using this user id
    if (!order) {
      res.status(404).json({
        sucess: false,
        message: "oredr not found",
      });
    } else {
      res.status(200).json({
        sucess: true,
        order,
      });
    }
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: "oredr not found",
    });
    console.log(error);
  }
};

// get logged in order (my order)
exports.myOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user.id });

    if (!orders) {
      res.status(404).json({
        sucess: false,
        message: "oredr not found",
      });
    } else {
      res.status(200).json({
        sucess: true,
        orders,
      });
    }
  } catch (error) {}
};

// Get all Orders (--- ADMIN )
exports.getAllOrder = async (req, res) => {
  try {
    const orders = await orderModel.find();
    // Get total ordered producd  price  for admin

    let totalproductprice = 0;
    orders.forEach((order) => {
      totalproductprice += order.paymentinfo.tottalprise;
    });

    if (!orders) {
      res.status(404).json({
        sucess: false,
        message: "oredr not found",
      });
    } else {
      res.status(200).json({
        sucess: true,
        orders,
        totalproductprice,
      });
    }
  } catch (error) {}
};

// Update Order Status (--- --- ADMIN  )

exports.updateOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    // Get total ordered producd  price  for admin
    if (order.orderstatus === "delivered") {
      res.status(400).json({
        message: "you have already delevired this product ",
      });
    } else {
      order.orderstatus = req.body.orderstatus;
      if (order.orderstatus === "delivered") {
        order.orderitems.forEach(async (check) => {
          await updateStock(check.product, check.quantity);
          //updateStock use  for update the quantity of the product
        });
        order.deliverdate = Date.now();
        await order.save({ validateBeforeSave: false });
      }
      res.status(200).json({
        sucess: true,
        message: "oredr updated sucessfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: "oredr not found",
    });
  }
};

// updateStock defined for update the quantity of the product
async function updateStock(id, quantity) {
  const product = await productmodle.findById(id);
  product.stock -= quantity;
  await product.save();
  console.log(product.stock);
}

// Delete order (....ADMIN )
exports.deletOrder = async (req, res) => {
  try {
    const orders = await orderModel.findById(req.params.id);
    if (!orders) {
      res.status(404).json({
        sucess: false,
        message: "oredr not found",
      });
    } else {
      await orders.deleteOne();
      res.status(200).json({
        sucess: true,
        message: "oredr deleted sucessfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
