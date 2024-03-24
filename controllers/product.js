const { Products } = require("../models/productSchema");

const getAllProducts = async (req, res, next) => {
  try {
    const dataProducts = await Products.find();
    res.status(200).json({ dataProducts });
  } catch (error) {
    next(error);
  }
};

const getDietProductsByBloodType = async (req, res, next) => {
  const { bloodType, height, age, currentWeight, desiredWeight } = req.body;

  const dailyRate = Math.round(
    10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight)
  );

  try {
    const dataProducts = await Products.find();

    const notAllowedProducts = dataProducts.filter(
      (product) => product.groupBloodNotAllowed[bloodType] === true
    );

    if (!notAllowedProducts.length) {
      res.status(404).json({
        message: "Not found",
      });
    }

    res.status(200).json({
      result: {
        dailyRate,
        notAllowedProducts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProductByQuery = async (req, res, next) => {
  const { title } = req.query;

  try {
    const dataProducts = await Products.find({
      title: { $regex: title, $options: "i" },
    });

    if (dataProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ data: dataProducts });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getDietProductsByBloodType,
  getProductByQuery,
};
