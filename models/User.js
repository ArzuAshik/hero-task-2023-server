const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

// schema design
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide your name."],
        trim: true,
        minLength: [3, "Too short name."],
        maxLength: [50, "Name is too large."]
    },
    email: {
        type: String,
        required: [true, "Please Provide your email."],
        // trim: true,
        unique: [true, "email is already exist."],
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: "Please provide a valid email."
        }
    },
    password: {
        type: String,
        required: [true, "Please Provide your password."],
        validate: {
            validator: (value) => {
                return validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 });
            },
            message: "Please create a strong password. minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1"
        }
    },

}, {
    timestamps: true
});

userSchema.pre("save", function (next) {
    const password = this.password;
    const hashPassword = bcrypt.hashSync(password);
    this.password = hashPassword;
    next();
});

userSchema.methods.verifyPassword = function (password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
}

// Model
exports.User = mongoose.model("User", userSchema);