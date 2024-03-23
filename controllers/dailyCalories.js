const { DailyCalories } = require("../models/dailyCalorieSchema");

const addConsumedProduct = async (req, res, next) => {
  const { _id } = req.user;
  const { weight, product, date, calories } = req.body;

  const consumedCalories = (calories * weight) / 100;

  try {
    let dailyProduct = await DailyCalories.findOne({
      owner: _id,
      date,
      product,
    });

    let result;

    if (!dailyProduct) {
      dailyProduct = await DailyCalories.create({
        owner: _id,
        date,
        product,
        weight,
        consumedCalories,
      });
      result = dailyProduct;
    } else {
      dailyProduct.weight += weight;
      dailyProduct.consumedCalories += consumedCalories;

      result = await dailyProduct.save();
    }

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteConsumedProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const { _id } = req.user;

    const removedProduct = await DailyCalories.findOneAndDelete({
      _id: productId,
      owner: _id,
    });

    if (!removedProduct) {
      return res.status(404).json({
        status: "error",
        message: `Product with id: '${productId}' not found or unauthorized to delete`,
      });
    }

    res.status(200).json({
      status: "success",
      removedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getDailyInformation = async (req, res) => {
  try {
    const { _id } = req.user;
    const { date } = req.query;

    const result = await DailyCalories.find({ owner: _id, date });

    if (!result.length) {
      return res.status(404).json({
        status: "error",
        message: "Added products not found on this date",
      });
    }

    const caloricityPerDay = result.reduce((acc, it) => {
      acc += it.consumedCalories;
      return acc;
    }, 0);

    const dateAdded = result[0].date;

    res.status(200).json({
      status: "success",
      data: {
        result,
        date: new Date(date),
        caloricityPerDay,
        dateAdded,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addConsumedProduct,
  deleteConsumedProductById,
  getDailyInformation,
};