const { Schema, model } = require("mongoose");

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
  DailyCalories,
};
