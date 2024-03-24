const express = require("express");
const ctrl = require("../../controllers/product");
const validateJoiSchema = require("../../middlewares/validationMiddleware");
const { productJoiSchema } = require("../../models/productSchema");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/allProducts", ctrl.getAllProducts);
router.get("/query", auth, ctrl.getProductByQuery);
router.post(
  "/",
  validateJoiSchema(productJoiSchema),
  ctrl.getDietProductsByBloodType
);

module.exports = router;
