const mongoose = require("mongoose");
const User = require("./User");

const refreshTokenSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    token:{
        type:String,
        required:true
    },
    expireAt:{
        type: Date,
        required:true
    }
},{
    timestamp:true
})
refreshTokenSchema.index({expireAt:1},{expireAfterSecond:0});
module.exports = mongoose.model("RefreshToken",refreshTokenSchema);