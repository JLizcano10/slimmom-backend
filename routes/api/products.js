const express = require("express");
const ctrl = require("../../controllers/product");
const validateJoiSchema = require("../../middlewares/validationMiddleware");
const { productJoiSchema } = require("../../models/productSchema");

const router = express.Router();

router.get("/", ctrl.getAllProducts);
router.get("/query", ctrl.getProductByQuery);
router.post(
  "/",
  validateJoiSchema(productJoiSchema),
  ctrl.getDietProductsByBloodType
);
// router.delete("/:productId", () => {});

module.exports = router;
