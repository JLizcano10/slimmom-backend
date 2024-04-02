const { Schema, model } = require("mongoose");

const Joi = require("joi");

const dailyCalorieJoiSchema = Joi.object({
  // date: Joi.date().iso().required(),
  date: Joi.alternatives()
    .try(
      Joi.string().isoDate(), // Acepta fechas en formato ISO (YYYY-MM-DD)
      Joi.string().regex(/^\d{2}\.\d{2}\.\d{4}$/) // Acepta fechas en formato "DD.MM.YYYY" De la pagina calculadora de calorias. (Mafe, Jhon, Pablo)
    )
    .required(),
  product: Joi.string().required(),
  weight: Joi.number().integer().min(20).max(1000).required(),
  // OJO!!! Calories es lo que vendrá del formulario.
  calories: Joi.number(),
});

const dailyCalorieSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    date: {
      type: Date,
      required: [true, "Date is a required field"],
    },
    product: {
      type: String,
      required: [true, "Product is a required field"],
    },
    weight: {
      type: Number,
      required: [true, "Weight is a required field"],
    },
    consumedCalories: {
      type: Number,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const DailyCalories = model("dailyCalories", dailyCalorieSchema);

module.exports = {
  dailyCalorieJoiSchema,
  DailyCalories,
};
