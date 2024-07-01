//this function authenticate the user who can acees the data
const jwt = require("jsonwebtoken");
const usermodel = require("../modeles/usermodels");

//AUHENTICATION CHECK
const isAuthUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      res.status(401).json({
        message: "please login first to access thise resource ",
      });
    }
    const decodeddata = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodeddata);

    //first decode and verify the token using jwt verify method

    req.user = await usermodel.findById({ _id: decodeddata.id });

    //and then find the id form the usermodel using this token id and store in user

    next();
    // next os callback function
  } catch (error) {
    // console.log(error);
  }
};

//LOGOUT
const logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    sucess: true,
    message: "Logged out",
  });
};

//AUHENTICAT USER ROLE "ONLY ADMINN CAN CREAT ,UPDATE AND DELETE PRODUCT"
//...spred oprator use 
exports.authRole = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        //INCLUDES() IS ARRAY METHOD
        res.status(401).json({
          message: `${req.user.role} Cannot access`,
        });
      }
      next();
    };
  } catch (error) {
    // console.log("the error is" + error);
  }
};
// in avobe function i'm direct use the expoort bcz i am not abule to send params using module .exports

module.exports.isAuthUser = isAuthUser;
module.exports.logout = logout;
