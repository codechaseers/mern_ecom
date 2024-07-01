const userAddress_Model = require("../modeles/useraddress_model")
const usermodel = require("../modeles/usermodels");

//Create address
exports.addaddress = async (req, res, next) => {
    try {
        const alladdress = await userAddress_Model.create({
            all_address: [{
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                pin: req.body.pin,
                mobile: req.body.mobile

            }],
            user: req.user._id,
        })
        res.status(201).json({
            sucess: true,
            alladdress
        })
    } catch (error) {
        console.log(error),
            res.status(500).json({
                sucess: false,
                message: error,
            })
    }
}

// get all the address for spacific users 

exports.getaddress = async (req, res, next) => {
    try {
        const address = await userAddress_Model.find({ user: req.body.user });

        if (!address) {
            res.status(404).json({
                sucess: false,
                message: "user have no address",
            });
        } else {
            res.status(200).json({
                sucess: true,
                address,
            });
        }
    } catch (error) {

    }
}

// delete cart items

exports.deleteaddress = async (req, res, next) => {
    try {
        let address = await userAddress_Model.findByIdAndDelete(req.body.id);
        if (address) {
            res.status(200).json({
                status: true,
            
                message: "address removed sucessfuly",
            });
        }
        else {
            res.status(500).json({
                status: false,

                message: "address alredy deleted",
            });
        }
    } catch (error) {

        res.status(500).json({
            status: false,
            message: "address  not found",
        });
    }
};