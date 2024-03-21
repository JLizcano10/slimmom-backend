const Joi = require("joi");
const { Schema, model } = require("mongoose");
const bCrypt = require("bcryptjs");

const UserJoiSchema = Joi.object({
  bloodType: Joi.number().min(1).max(4).required(),
  height: Joi.number().min(100).max(250).required(),
  age: Joi.number().min(18).max(100).required(),
  weight: Joi.number().min(20).max(500).required(),
  desiredWeight: Joi.number().min(20).max(500).required(),
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    bloodType: {
      type: Number,
      default: null,
    },
    dailyRate: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    weight: {
      type: Number,
      default: null,
    },
    desiredWeight: {
      type: Number,
      default: null,
    },
    notAllowedProducts: {
      type: Array,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const Users = model("users", userSchema);

module.exports = {
  UserJoiSchema,
  Users,
};
