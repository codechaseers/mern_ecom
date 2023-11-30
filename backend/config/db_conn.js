const mongoes = require("mongoose")

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
