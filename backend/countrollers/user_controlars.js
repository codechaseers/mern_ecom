const usermodel = require("../modeles/usermodels");
const sendEmail = require("../utils/sendemail");
const crypto = require("crypto");
const cloudinary = require("cloudinary")


// Register user 

const creatUser = async (req, res, next) => {
  try {
    // const mycloude=await cloudinary.v2.uploader.upload(req.body.avtar,{

    //   overwrite:true,
    //   invalidate:true,
    //   folder:"avtar",
    //   quality:"100",
    //   width:150,
    //   crop:"scale",
    // })
    const { name, email, password } = req.body;
    const user = await usermodel.create({
      name,
      email,
      password,
      // avatar: {
      //   public_id: mycloude.public_id,
      //   url: mycloude.secure_url,
      // },
      avatar: {
        public_id: "dfd",
        url: "ffdhfdhddf"
      },
    });
    //AFTER SIGNUP THE USER DIRECT LOGIN
    const token = await user.getJwttoken();

    res.status(201).cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
      .json({
        sucess: true,
        user,
        token,
      });
  } catch (error) {
    // check duplicate email  error
    if (error.code === 11000) {
      res.status(403).json({
        sucess: false,
        message: `Duplicate ${Object.keys(error.keyValue)} error`,
      });
    }
    else {
      res.status(403).json({
        sucess: false,
        key: "loude",
        message: error.message,
      });
    }
    console.log("register eror" + JSON.stringify(error));
  }
};

// login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check the user email and password enter or not

    if (!email || !password) {
      return res.status(403).json({
        sucess: false,
        message: "please enter email and password",
      });
    }
    const finduser = await usermodel.findOne({ email }).select("+password");

    // checking user exist or not

    if (!finduser) {
      res.status(403).json({
        sucess: false,
        message: "invalid email or password",
      });
    }
    const ispasswordmatsch = await finduser.comparePassword(password);

    // check the  password match or not ---> These function are defined in user module

    if (!ispasswordmatsch) {
      res.status(403).json({
        sucess: false,
        message: "invalid email and password",
      });
    }

    if (ispasswordmatsch) {
      let token = await finduser.getJwttoken();

      // set the token in cookies
      res.cookie("token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        //THIS IS COOKIE EXPIRE TIME COUNT
        httpOnly: true,
      });

      res.status(200).json({
        sucess: true,
        message: "Login Sucessfully",
        finduser,
        token,
      });
    }
  } catch (error) {
    // console.log(error);
  }
};


// RESET PASSWORD  


exports.forgetPassword = async (req, res) => {
  // take email form the user check exist or not
  const user = await usermodel.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    res.status(400).json({
      message: "Email not found",
    });
  }
  else {
    //Get reset password token
    const resetToken = await user.getResetPasswordToken();
    //save it in db
    await user.save({ validateBdforeSave: false });

    const reseturl = `http://localhost:3000/password/reset/${resetToken}`;

    const message = `your password reset url is :-\n\n ${reseturl} \n\n if you have not request this email then ignore it 🙂 `;

    // sending argument in this function for sending mail via nodemailer --> this function form util sendemail
    try {
      await sendEmail({
        email: user.email,
        subject: "Ecomerse Reset password token",
        message,
      });
      res.status(200).json({
        sucess: true,
        message: "Reset password send to your mail",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBdforeSave: false });
      res.status(500).json({
        // message: error.message,
        k: "jhjh"

      });
      // console.log(error);
    }
  }
};
// FORGET PASSWORD

exports.resetPassword = async (req, res) => {
  //get the token form params in URL and hash it and then compaire it to the DB resetPasswordToken field
  try {
    console.log(req.body.password);
    const findPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    console.log(findPasswordToken);
    const user = await usermodel.findOne({
      resetPasswordToken: findPasswordToken,
      // resetPasswordExpire: { $gt: Date.now() }
    });

    // if user not found

    if (!user) {
      res.status(400).json({
        message: " reset password token is invalied or has been expired",
      });
    }
    // check password and confirom password
    if (req.body.password !== req.body.confirmpassword) {
      res.status(400).json({
        message: "password does not match",
      });
    }
    if (req.body.password == req.body.confirmpassword) {
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(200).json({
        user,
        message: "password changed sucessfully",
      });
    }
  } catch (error) {
    // console.log(error);
  }
};

// get user ditals

exports.getuserDitals = async (req, res) => {
  try {
    const user = await usermodel.findById(req.user._id);
    res.status(200).json({
      user,
      message: "logined user ditals",
    });
    console.log(user);
  } catch (error) { }
};

// Update password

exports.updatePassword = async (req, res) => {
  try {
    const user = await usermodel.findById(req.user._id).select("+password");
    const ispasswordmatsch = await user.comparePassword(req.body.oldpassword);
    if (!ispasswordmatsch) {
      res.status(400).json({
        message: "Old password does not match",
      });
    }

    if (req.body.newpassword !== req.body.confirmpassword) {
      res.status(400).json({
        message: "password does not match",
      });
    }
    if (req.body.newpassword == req.body.confirmpassword) {
      user.password = req.body.confirmpassword;
      await user.save();

      res.status(200).json({
        message: "Password chaged sucessfuly",
      });
    }
    // im not use sendtoken() ?!?!?!
  } catch (error) {
    // console.log(error);
  }
};

//update user profile

exports.updateProfile = async (req, res) => {
  try {
    const newuserData = {
      name: req.body.name,
      email: req.body.email,
    };
    // i will add cloud navy for avtar laeter
    const user = await usermodel.findByIdAndUpdate(req.user._id, newuserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      sucess: true,
      message: "Profile update sucessfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      message: "Profile not update sucessfully",
    });
  }
};

// Get all users ditals (....--- ADMIN )

exports.alluserDitals = async (req, res) => {
  try {
    const users = await usermodel.find();
    res.status(200).json({
      users,
      sucess: true,
    });
  } catch (error) { }
};

// Get single users ditals (....--- ADMIN )

exports.singleuserDitals = async (req, res) => {
  try {
    const user = await usermodel.findById(req.params.id);
    res.status(200).json({
      user,
      sucess: true,
    });
  } catch (error) { }
};

// update user profile  (....--- ADMIN )

exports.updateRole = async (req, res) => {
  try {
    const newuserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    // i will add cloud navy for avtar laeter
    const user = await usermodel.findByIdAndUpdate(req.user._id, newuserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      sucess: true,
      message: "Profile update sucessfully",
    });
  } catch (error) { }
};

// Delet user (--- ADMIN )
exports.deleteUser = async (req, res) => {
  try {
    const user = await usermodel.findById(req.params.id);
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    } else {
      await user.deleteOne();
      res.status(200).json({
        message: "user deleted sucessfully",
      });
    }
  } catch (error) { }
};

module.exports.creatUser = creatUser;
module.exports.loginUser = loginUser;
