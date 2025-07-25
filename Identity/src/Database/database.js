const mongoose = require("mongoose");

async function handleDatabase(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database connected Successfully");
    })
    .catch((error)=>{
        console.log(error.message)
    })
}

module.exports = handleDatabase;