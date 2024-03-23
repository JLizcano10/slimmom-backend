const express = require("express");
const ctrl = require("../../controllers/dailyCalories");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/query", auth, ctrl.getDailyInformation);
router.post("/", auth, ctrl.addConsumedProduct);
router.delete("/:productId", auth, ctrl.deleteConsumedProductById);

module.exports = router;
