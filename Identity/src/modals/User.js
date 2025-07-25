const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true  // fixed typo from "timestamp"
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();
        this.password = await argon2.hash(this.password);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await argon2.verify(this.password, candidatePassword);
    } catch (error) {
        throw error;
    }
};

userSchema.index({ userName: "text" }); // Optional text index for searching

// ✅ No await here — just define the model
const User = mongoose.model("User", userSchema);

module.exports = User;
