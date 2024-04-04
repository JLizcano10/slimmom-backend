const express = require("express");
const ctrl = require("../../controllers/dailyCalories");
const auth = require("../../middlewares/auth");
const validateJoiSchema = require("../../middlewares/validationMiddleware");
const { dailyCalorieJoiSchema } = require("../../models/dailyCalorieSchema");

const router = express.Router();

router.get("/query", auth, ctrl.getDailyInformation);
router.post(
  "/",
  auth,
  validateJoiSchema(dailyCalorieJoiSchema),
  ctrl.addConsumedProduct
);
router.delete("/:productId", auth, ctrl.deleteConsumedProductById);

module.exports = router;
