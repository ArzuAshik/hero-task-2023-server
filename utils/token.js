const jwt = require('jsonwebtoken');
exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role,
        id: userInfo._id.toString()
    }

    return jwt.sign(payload, process.env.JSON_KEY, { expiresIn: "1 days" });
}