const mongoes = require("mongoose")
 
const dotenv = require('dotenv');
const { log } = require("console");
dotenv.config();
console.log(process.env.DB_URL);
const connectionDb = () => {
    mongoes.connect(process.env.DB_URL, {

        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useCreateIndex:true

    }).then(() => {

        console.log("database coonection ok");

    }).catch((err) => {
        console.log(err);
    })
}
module.exports = connectionDb
