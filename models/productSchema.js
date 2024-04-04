const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productJoiSchema = Joi.object({
  height: Joi.number().integer().min(100).max(250).required(),
  age: Joi.number().integer().min(18).max(100).required(),
  currentWeight: Joi.number().integer().min(20).max(500).required(),
  desiredWeight: Joi.number().integer().min(20).max(500).required(),
  bloodType: Joi.number().integer().required(),
});

const productSchema = new Schema(
  {
    categories: {
      type: Array,
    },
    weight: {
      type: Number,
    },
    title: {
      type: Object,
    },
    calories: {
      type: Number,
    },
    groupBloodNotAllowed: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

const Products = model("products", productSchema);

module.exports = {
  productJoiSchema,
  Products,
};
