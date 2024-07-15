const express = require("express");
const app = express();
const product = require("./routes/product_rotes");
const user = require("./routes/user_routes");
const order = require("./routes/order_route");
const addtocart = require("./routes/addtocart_route");
const useraddress = require("./routes/useraddress_route");
const cookieParser = require("cookie-parser");
const bodyparser= require("body-parser")
const fileupload=require("express-fileupload")

app.use(express.json());
app.use(express.json({
    extended:true,
    limit: '50mb'
  }));
// route all merge
app.use(cookieParser());
app.use(bodyparser.urlencoded({limit: '50mb',extended:true}))
app.use(fileupload())
app.use(product);
app.use(user);
app.use(order); 
app.use(addtocart);
app.use(useraddress);

console.log("app start");
module.exports = app;
 