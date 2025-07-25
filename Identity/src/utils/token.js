const jwt = require("jsonwebtoken");
const RefreshToken = require("../modals/RefreshToken");

const generateToken = async (user) => {
    const accessToken = jwt.sign({
        userId: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "60m"
        })
    
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const expireAt = new Date;
    expireAt.setDate(expireAt + 7);


    await RefreshToken.create({
        user:user._id,
        token:refreshToken,
        expireAt:expireAt
    });
    
    return {accessToken, refreshToken}
}

module.exports = generateToken;

