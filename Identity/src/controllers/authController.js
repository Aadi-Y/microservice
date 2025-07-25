const User = require("../modals/User");
const logger = require("../utils/logger");
const validateRegistration = require("../utils/validation");
const generateToken = require("../utils/token");

async function handleRegister(req, res) {
    try {
        const { error } = validateRegistration(req.body);

        if (error) {
            logger.warn("Validation error", error.details[0].message);
            return res.status(400).json({
                error: true,
                message: error.details[0].message
            });
        }

        const { username, email, password } = req.body;

        const user = User.find({ $or: [{ username }, { email }] });

        if (user) {
            logger.warn("User aldready exist");
            return res.status(400).json({
                success: false,
                message: "User aldready exist"
            })
        }

        const newUser = new User({
            username,
            email,
            password
        })

        await newUser.save();

        const { accessToken, refreshToken } = await generateToken(newUser);

        logger.info("User registered successfully");
        res.status(201).json({
            success: true,
            message: "User registered Successfully",
            accessToken,
            refreshToken
        });


    } catch (error){
        logger.error("Registration error : ", e);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

function handleLogin(req, res) {

}

module.exports = {
    handleRegister
}

