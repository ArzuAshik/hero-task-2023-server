const { User } = require("../models/User");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const { password, ...data } = user.toObject();

        res.status(200).json({
            message: "Signup Successful.",
            data
        });
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).json({ message: "email and password is required." });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "No user found with this email." });
        }
        const isPasswordMatched = user.verifyPassword(password, user.password);

        if (!isPasswordMatched) {
            return res.status(401).json({ message: "incorrect email or password." });
        }

        const { password: pd, createdAt, updatedAt, ...data } = user.toObject();
        res.status(200).json({
            message: "Login Successful.",
            token: generateToken(data),
            data
        });
    } catch (error) {
        res.send(error);
    }
}