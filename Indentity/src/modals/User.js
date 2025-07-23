const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        unique,
        trim:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
},{
    timestamp:true
})

userSchema.pre('save',async function (next){
    try{
        if(!this.isModified(password)) return next();
        this.password = await argon2.hash(password);
    }catch(error){
        next(error);
    }
})

userSchema.methods.comparePassword = async function (candidatePassword){
    try{
        return await argon2.verify(this.password,candidatePassword);
    }catch(error){
        throw error;
    }
}

userSchema.index({userSchema:"text"});

const User = await mongoose.modal(User,userSchema);

module.export = User;