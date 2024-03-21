const { Products } = require("../models/productSchema");
const { Users } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

// Para test conexion correcta con BD
const getUsers = async (req, res, next) => {
  try {
    const result = await Users.find({}, { _id: 0, password: 0 });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const signupUser = async (req, res, next) => {
  const { name, password, email } = req.body;
  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }

  try {
    const newUser = new Users({ name, email, password });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
      data: {
        user: {
          name,
          email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { password, email, bloodType } = req.body;

  try {
    const existingUser = await Users.findOne({ email });

    if (!existingUser || !existingUser.validPassword(password)) {
      return res.status(401).json({
        status: "unauthorized",
        code: 400,
        message: "Email or password is wrong",
      });
    }

    const payload = {
      id: existingUser.id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    existingUser.token = token;
    existingUser.bloodType = bloodType;
    await existingUser.save();

    res.status(200).json({
      data: {
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
        bloodType,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const result = await Users.findByIdAndUpdate(_id, { token: null });
    res.status(204).json({
      message: "Logout successfull!",
    });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    // Para no pasar password y token
    const {
      _id,
      name,
      email,
      bloodType,
      dailyRate,
      height,
      age,
      weight,
      desiredWeight,
      notAllowedProducts,
    } = req.user;

    res.status(200).json({
      user: {
        _id,
        name,
        email,
        bloodType,
        dailyRate,
        height,
        age,
        weight,
        desiredWeight,
        notAllowedProducts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { bloodType, height, age, weight, desiredWeight } = req.body;
  const { _id } = req.user;

  const dailyCaloricIntake = Math.round(
    10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight)
  );

  const products = await Products.find({});

  const notAllowedProducts = products.filter(
    (product) => product.groupBloodNotAllowed[bloodType] === true
  );

  if (!notAllowedProducts.length) {
    res.status(404).json({
      message: "Not found",
    });
  }

  await Users.findByIdAndUpdate(
    _id,
    {
      bloodType,
      height,
      age,
      weight,
      desiredWeight,
      dailyRate: dailyCaloricIntake,
      notAllowedProducts,
    },
    {
      new: true,
    }
  );

  const user = {
    bloodType,
    height,
    age,
    weight,
    desiredWeight,
    dailyRate: dailyCaloricIntake,
    notAllowedProducts,
  };

  res.json({
    status: "success",
    code: 200,
    data: {
      user,
    },
  });
};

module.exports = {
  getUsers,
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUser,
};
