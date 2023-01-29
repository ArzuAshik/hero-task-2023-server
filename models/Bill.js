const mongoose = require("mongoose");
const validator = require('validator');

// schema design
const billSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your full name."],
      trim: true,
      minLength: [3, "Too short name."],
      maxLength: [50, "Name is too large."],
    },
    email: {
      type: String,
      required: [true, "Please Provide your email."],
    //   trim: true,
    //   unique: [true, "email is already exist."],
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: "Please provide a valid email.",
      },
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number."],
      minLength: [11, "Phone number should be 11 digit."],
      maxLength: [11, "Phone number should be 11 digit."],
    },
    paidAmount: {
        type: Number,
        required: [true, "Please provide paid amount."],
        min: [1, "Amount can't be less than 1."]
    },
  },
  {
    timestamps: true,
  }
);

// Model
exports.Bill = mongoose.model("Bill", billSchema);
