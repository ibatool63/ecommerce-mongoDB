const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT secret key is not defined. Please set JWT_ENV in the environment variables.");
    }

    return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, { expiresIn: "1h" });
};

module.exports.generateToken = generateToken;
