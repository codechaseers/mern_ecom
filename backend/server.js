const app = require('./app.js')
const dotenv = require('dotenv');
const { path } = require('./app.js');
const dbconn=require("./config/db_conn")
const cloudinary=require("cloudinary").v2

// cloudnary config for using file upload image video etc ...
dotenv.config({ path: "backend/config/config.env" })

cloudinary.config({
    cloud_name:  process.env.CLOUDNARY_NAME,
    api_key:  process.env.CLOUDNARY_API_KEY,
    api_secret:  process.env.CLOUDNARY_API_SECRET,
    secure:true
   
})

// config path

// conection functioun call
dbconn()



// server port define using env variable
app.listen(process.env.PORT, () => {
    console.log("server is working on port:" + process.env.port);
})